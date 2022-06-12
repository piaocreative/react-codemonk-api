const crypt = require('../../../util/crypt');
const signUpTalentValidator = require('./signUpTalentValidator');
const UtilFunctions = require('../../../util/utilFunctions');
const User = require('../../../models/user.model');
const Talent = require('../../../models/talent.model');
const Client = require('../../../models/client.model');
const Agency = require('../../../models/agency.model');
const Email = require('../../../util/sendEmail');
const EngageBay = require('../../engageBay/engageBay');
const CodeMonkError = require('../../../util/CodeMonkError');
const AssignReferrerToTalentService = require('../assignReferrerToTalent/assignReferrerToTalentService');
const TalentEventlogRecordService = require('../talentEventlogRecord/talentEventlogRecordService');
const Recruiter = require('../../../models/recruiter.model');
const Ambassador = require('../../../models/ambassador.model');

/**
 * Class represents services for Sign-up.
 */
class SignUpTalentService {

    /**
     * @desc This function is being used to signUp talent user
     * @author CodeMonk
     * @since 22/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     */
    static async signUp (req, local) {
        const Validator = new signUpTalentValidator(req.body, local);
        await Validator.validate();
        req.body.email = req.body.email.toLowerCase();
        const user = await SignUpTalentService.isUserAlreadyRegister(req.body);

        if (!user) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = req.body.userType;
            const otp = UtilFunctions.generateOtp();
            await SignUpTalentService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = (userType === 1) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (user.isActive === 2) {
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else if (user.isActive === 0 && user.role === CONSTANTS.ROLE.TALENT && await SignUpTalentService.checkFreelancerTalentSignIn(user._id)) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = user.role;
            const otp = UtilFunctions.generateOtp();
            await SignUpTalentService.updateRegistrationUser(user, hash, otp, req.body.referral);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = (userType === 1) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);

            return { email: req.body.email, role: userType };
        } else if (user.isActive === 0 && user.role === CONSTANTS.ROLE.TALENT && await SignUpTalentService.checkAgencyTalentSignIn(user._id)) {
            throw new CodeMonkError(local('TALENT_IS_INVITED_BY_AGENCY'), 452);
        } else {
            return await SignUpTalentService.checkLogin(req.body.password, user, local);
        }
    }

    /**
     * @desc This function is being used to check email already exists for sign-up of talent
     * @author CodeMonk
     * @since 22/10/2021
     * @param {Object} reqObj reqObj
     */
    static async isUserAlreadyRegister (reqObj) {
        const where = { email: reqObj.email };
        return await User.findOne(where).lean();
    }

    /**
     * @desc This function is being used to save or update talent details
     * @author CodeMonk
     * @since 22/10/2021
     * @param {Object} reqObj Request
     * @param {Object} reqObj.body RequestBody
     * @param {Object} reqObj reqObj
     * @param {String} hash password
     * @param {Object} otp otp
     * @param {Integer} userType 1 = Talent 2 = Client
     */
    static async saveOrUpdateRegistrationUser (reqObj, hash, otp, userType) {
        reqObj.password = hash;
        reqObj.isActive = CONSTANTS.STATUS.PENDING;
        reqObj.otp = otp;
        reqObj.role = userType;
        const userDetails = await User.create(reqObj);
        if (userType === CONSTANTS.ROLE.TALENT) {
            const code = await this.generateTalentCode();
            await Talent.create({
                userId: userDetails._id, code,
                version: 'v2',
                registerType: CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER,
                signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.INITIAL_TYPE_STAGE
            });
            EngageBay.createEngageBayContact(userDetails, ['talent', 'incomplete']);
            if (reqObj.referral) {
                const referral = await AssignReferrerToTalentService.assignReferrerToTalent(userDetails, reqObj.referral);
                const referraler = await User.findById(reqObj.referral);
                await TalentEventlogRecordService.addEventLog(userDetails._id, 'invited', `Invited by ${referraler.firstName} ${referraler.lastName}`, referral && referral.referredOn ? referral.referredOn : Date.now());
            }
            await TalentEventlogRecordService.addEventLog(userDetails._id, 'signup', 'Signed-up');
        } else {
            await Client.create({ userId: userDetails._id });
            EngageBay.createEngageBayContact(userDetails, ['client', 'incomplete']);
        }
    }

    static async checkFreelancerTalentSignIn (userId) {
        const talent = await Talent.findOne({ userId }, { registerType: 1 }).lean();
        if (talent && talent.registerType &&
            talent.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER
        ) {
            return true;
        } else {
            return false;
        }
    }

    static async updateRegistrationUser (user, hash, otp, referralUserId) {
        await User.updateOne({ _id: user._id }, {
            $set: {
                password: hash,
                otp: otp
            }
        });
        if (user.role === CONSTANTS.ROLE.TALENT) {
            const code = await this.generateTalentCode();
            await Talent.updateOne({ userId: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE,
                    code,
                    version: 'v2',
                    registerType: CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER,
                    signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.INITIAL_TYPE_STAGE
                }
            });
            EngageBay.createEngageBayContact(user, ['talent', 'incomplete']);
            if (referralUserId) {
                await AssignReferrerToTalentService.assignReferrerToTalent(user, referralUserId);
            }
        }
    }

    static async generateTalentCode () {
        const code = await crypt.generateCode();
        const talent = await Talent.find({ code: code }).limit(1).select('userId');
        if (talent.length > 0) {
            return await this.generateTalentCode();
        }
        return code;
    }

    static async checkLogin (password, user, local) {
        const isMatch = await crypt.comparePassword(password, user.password);
        let otherDetails = {};
        if (!isMatch) {
            throw new CodeMonkError(local('ALREADY_REGISTER'), 422);
        } else if (user.isActive === 0) {
            await SignUpTalentService.reSendOTPByUser(user, user.email);
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
                case CONSTANTS.ROLE.AMBASSADOR:
                    otherDetails = await Ambassador.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    break;
            }
            user = _.merge(user, token, otherDetails);
        }

        return user;
    }

    static async checkAgencyTalentSignIn (userId) {
        const talent = await Talent.findOne({ userId }, { registerType: 1 }).lean();
        if (talent && talent.registerType &&
            talent.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY
        ) {
            return true;
        } else {
            return false;
        }
    }

    static async reSendOTPByUser (user, email) {
        const subject = 'Lets invent the future of work with CodeMonk';
        const template = 'emailTemplates/verificationOtpMail.html';
        const appUrl = (user.role === CONSTANTS.ROLE.TALENT) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
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

module.exports = SignUpTalentService;
