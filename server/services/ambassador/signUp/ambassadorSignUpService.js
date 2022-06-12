const crypt = require('../../../util/crypt');
const ambassadorSignUpValidator = require('./ambassadorSignUpValidator');
const UtilFunctions = require('../../../util/utilFunctions');
const Ambassador = require('../../../models/ambassador.model');
const User = require('../../../models/user.model');
const Client = require('../../../models/client.model');
const Agency = require('../../../models/agency.model');
const Email = require('../../../util/sendEmail');
const EngageBay = require('../../engageBay/engageBay');
const CodeMonkError = require('../../../util/CodeMonkError');

/**
 * Class represents services for Sign-up.
 */
class AmbassadorSignUpService {

    /**
     * @desc This function signs up an ambassador
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param local
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     */
    static async signUp (req, local) {
        const Validator = new ambassadorSignUpValidator(req.body, local);
        await Validator.validate();

        req.body.email = req.body.email.toLowerCase();
        const user = await AmbassadorSignUpService.userAlreadyRegistered(req.body);

        if (!user) {
            // creates a new User/Ambassador
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = req.body.userType;
            const otp = UtilFunctions.generateOtp();
            await AmbassadorSignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL + '/ambassador';
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (user.isActive === 2) {
            // a User exists blocked by admin
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else if (
            user.isActive === 0 &&
            user.role === CONSTANTS.ROLE.AMBASSADOR &&
            await AmbassadorSignUpService.checkAmbassadorSignIn(user._id)
        ) {
            // User/Ambassador already exists, then update ambassador
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = user.role;
            const otp = UtilFunctions.generateOtp();
            await AmbassadorSignUpService.updateRegistrationUser(user, hash, otp);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL + '/ambassador';
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);

            return { email: req.body.email, role: userType };
        } else {
            // a User exists, then check Login
            return await AmbassadorSignUpService.checkLogin(req.body.password, user, local);
        }
    }

    /**
     * @desc This function checks if this same email exists
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} reqObj reqObj
     */
    static async userAlreadyRegistered (reqObj) {
        const where = { email: reqObj.email };
        return await User.findOne(where).lean();
    }

    /**
     * @desc This function saves or updates ambassador details
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} reqObj Request
     * @param {Object} reqObj.body RequestBody
     * @param {Object} reqObj reqObj
     * @param {String} hash password
     * @param {Object} otp otp
     * @param {Integer} userType 6 = Ambassador
     */
    static async saveOrUpdateRegistrationUser (reqObj, hash, otp, userType) {
        reqObj.password = hash;
        reqObj.isActive = CONSTANTS.STATUS.PENDING;
        reqObj.otp = otp;
        reqObj.role = userType;
        const userDetails = await User.create(reqObj);
        if (userType === CONSTANTS.ROLE.AMBASSADOR) {
            await Ambassador.create({
                userId: userDetails._id,
                signupStep: CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.INITIAL_TYPE_STAGE
            });
            EngageBay.createEngageBayContact(userDetails, ['ambassador', 'incomplete']);
        }
    }

    static async checkAmbassadorSignIn (userId) {
        const ambassador = await Ambassador.findOne({ userId }, { registerType: 1 }).lean();
        return !!(ambassador && ambassador.registerType);
    }

    static async updateRegistrationUser (user, hash, otp) {
        await User.updateOne({ _id: user._id }, {
            $set: {
                password: hash,
                otp: otp
            }
        });
        if (user.role === CONSTANTS.ROLE.AMBASSADOR) {
            await Ambassador.updateOne({ userId: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE,
                    registerType: CONSTANTS.AMBASSADOR.REGISTER_TYPE[1],
                    signupStep: CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.INITIAL_TYPE_STAGE
                }
            });
            EngageBay.updateEngageBayContactTags(user.email, ['ambassador', 'incomplete']);
        }
    }

    static async checkLogin (password, user, local) {
        const isMatch = await crypt.comparePassword(password, user.password);
        let otherDetails = {};
        if (!isMatch) {
            throw new CodeMonkError(local('ALREADY_REGISTER'), 422);
        } else if (user.isActive === 0) {
            await AmbassadorSignUpService.reSendOTPByUser(user, user.email);
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
                case CONSTANTS.ROLE.AMBASSADOR:
                    otherDetails = await Ambassador.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
            }
            user = _.merge(user, token, otherDetails);
        }

        return user;
    }

    static async reSendOTPByUser (user, email) {
        const subject = 'Lets invent the future of work with CodeMonk';
        const template = 'emailTemplates/verificationOtpMail.html';
        const appUrl = process.env.FRONTEND_URL + '/ambassador';
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

module.exports = AmbassadorSignUpService;
