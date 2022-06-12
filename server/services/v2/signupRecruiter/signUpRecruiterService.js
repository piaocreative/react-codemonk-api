const crypt = require('../../../util/crypt');
const signUpRecruiterValidator = require('./signUpRecruiterValidator');
const UtilFunctions = require('../../../util/utilFunctions');
const User = require('../../../models/user.model');
const Recruiter = require('../../../models/recruiter.model');
const Talent = require('../../../models/talent.model');
const Client = require('../../../models/client.model');
const Agency = require('../../../models/agency.model');
const Email = require('../../../util/sendEmail');
const EngageBay = require('../../engageBay/engageBay');
const CodeMonkError = require('../../../util/CodeMonkError');

/**
 * Class represents services for Sign-up.
 */
class SignUpRecruiterService {

    /**
     * @desc This function is being used to signUp talent user
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     */
    static async signUp (req, local) {
        const Validator = new signUpRecruiterValidator(req.body, local);
        await Validator.validate();

        req.body.email = req.body.email.toLowerCase();
        const user = await SignUpRecruiterService.isUserAlreadyRegister(req.body);

        if (!user) {
            // creates a new User & Recruiter
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = req.body.userType;
            const otp = UtilFunctions.generateOtp();
            await SignUpRecruiterService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL + '/recruiter';
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (user.isActive === 2) {
            // a User exists blocked by admin
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else if (
            user.isActive === 0 && user.role === CONSTANTS.ROLE.RECRUITER && await SignUpRecruiterService.checkRecruiterSignIn(user._id)
        ) {
            // a User & Recruiter already exists, then update Recruiter
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = user.role;
            const otp = UtilFunctions.generateOtp();
            await SignUpRecruiterService.updateRegistrationUser(user, hash, otp);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL + '/recruiter';
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);

            return { email: req.body.email, role: userType };
        } else {
            // a User exists, then check Login
            return await SignUpRecruiterService.checkLogin(req.body.password, user, local);
        }
    }

    /**
     * @desc This function is being used to check email already exists for sign-up of recruiter
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} reqObj reqObj
     */
    static async isUserAlreadyRegister (reqObj) {
        const where = { email: reqObj.email };
        return await User.findOne(where).lean();
    }

    /**
     * @desc This function is being used to save or update recruiter details
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} reqObj Request
     * @param {Object} reqObj.body RequestBody
     * @param {Object} reqObj reqObj
     * @param {String} hash password
     * @param {Object} otp otp
     * @param {Integer} userType 5 = Recruiter
     */
    static async saveOrUpdateRegistrationUser (reqObj, hash, otp, userType) {
        reqObj.password = hash;
        reqObj.isActive = CONSTANTS.STATUS.PENDING;
        reqObj.otp = otp;
        reqObj.role = userType;
        const userDetails = await User.create(reqObj);
        if (userType === CONSTANTS.ROLE.RECRUITER) {
            await Recruiter.create({
                userId: userDetails._id,
                version: 'v2',
                signupStep: CONSTANTS.RECRUITER.REGITRATION_STATUS.INITIAL_TYPE_STAGE
            });
            EngageBay.createEngageBayContact(userDetails, ['recruiter', 'incomplete']);
        }
    }

    static async checkRecruiterSignIn (userId) {
        const recruiter = await Recruiter.findOne({ userId }, { registerType: 1 }).lean();
        if (recruiter && recruiter.registerType) {
            return true;
        } else {
            return false;
        }
    }

    static async updateRegistrationUser (user, hash, otp) {
        await User.updateOne({ _id: user._id }, {
            $set: {
                password: hash,
                otp: otp
            }
        });
        if (user.role === CONSTANTS.ROLE.RECRUITER) {
            await Recruiter.updateOne({ userId: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE,
                    version: 'v2',
                    registerType: CONSTANTS.RECRUITER.REGISTER_TYPE[1],
                    signupStep: CONSTANTS.RECRUITER.REGITRATION_STATUS.INITIAL_TYPE_STAGE
                }
            });
            EngageBay.updateEngageBayContactTags(user.email, ['recruiter', 'incomplete']);
        }
    }

    static async checkLogin (password, user, local) {
        const isMatch = await crypt.comparePassword(password, user.password);
        let otherDetails = {};
        if (!isMatch) {
            throw new CodeMonkError(local('ALREADY_REGISTER'), 422);
        } else if (user.isActive === 0) {
            await SignUpRecruiterService.reSendOTPByUser(user, user.email);
        } else {
            const token = await crypt.getUserToken(user);
            delete user.password;
            delete user.__v;
            switch (user.role) {
                case CONSTANTS.ROLE.TALENT:
                    otherDetails = await Talent.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
                case CONSTANTS.ROLE.CLIENT:
                    otherDetails = await Client.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
                case CONSTANTS.ROLE.AGENCY:
                    otherDetails = await Agency.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
                case CONSTANTS.ROLE.RECRUITER:
                    otherDetails = await Recruiter.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
            }
            user = _.merge(user, token, otherDetails);
        }

        return user;
    }

    static async reSendOTPByUser (user, email) {
        const subject = 'Lets invent the future of work with CodeMonk';
        const template = 'emailTemplates/verificationOtpMail.html';
        const appUrl = process.env.FRONTEND_URL + '/recruiter';
        if (user.otp === 0) {
            user.otp = UtilFunctions.generateOtp();
            await User.updateOne({ _id: user._id }, {
                $set: {
                    otp: user.otp
                }
            });
        }
        const templateVariables = { appUrl, otp: user.otp };
        await Email.prepareAndSendEmail([user.email], subject, template, templateVariables);
        return { email: email };
    }
    /*
     End
    */
}

module.exports = SignUpRecruiterService;
