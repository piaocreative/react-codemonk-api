const crypt = require('../../util/crypt');
const signInValidator = require('./signInValidator');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const Client = require('../../models/client.model');
const Agency = require('../../models/agency.model');
const { generateOtp } = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const { TALENT_REGISTER_TYPE } = require('../../util/constants');
const AgencyTalent = require('../../models/agencyTalent.model');
const Recruiter = require('../../models/recruiter.model');
const Ambassador = require('../../models/ambassador.model');

/**
 * Class represents services for signin.
 */
class SignInService {
    /**
     * @desc This function is being used to sign in user
     * @author Innovify
     * @since 01/01/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {string} req.body.email email
     * @param {string} req.body.password password
     * @param {Object} res Response
     */
    static async signIn (req, local) {
        const Validator = new signInValidator(req.body, local);
        await Validator.validate();
        const email = req.body.email.toLowerCase();
        return await SignInService.userLogin(email, req.body.password, local);
    }

    /**
     * @desc This function is being used to end user login
     * @author Innovify
     * @since 01/01/2020
     * @param {Object} userEmail userEmail
     * @param {Object} password password
     * @param {Object} res Response
     * @param {function} callback callback Handles Response data/error messages
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async userLogin (userEmail, password, local) {
        let user = await User.findOne({ email: userEmail }).lean();

        CONSOLE_LOGGER.info(userEmail + '  ' );
        // Wrong username
        if (!user) {
            throw new CodeMonkError(local('LOGIN_FAIL'), 401);
        } else if (user.isActive === 1) {
            // Wrong Password
            const isMatch = await crypt.comparePassword(password, user.password);
            if (!isMatch) {
                throw new CodeMonkError(local('LOGIN_FAIL'), 401);
            } else {
                const token = await crypt.getUserToken(user);
                delete user.password;
                delete user.__v;
                if (user.role === CONSTANTS.ROLE.TALENT) {
                    const talentObject = await Talent.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    user = _.merge(user, token, talentObject);
                } else if (user.role === CONSTANTS.ROLE.CLIENT) {
                    const clientObject = await Client.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    user = _.merge(user, token, clientObject);
                } else if (user.role === CONSTANTS.ROLE.AGENCY) {
                    const agencyObject = await Agency.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    user = _.merge(user, token, agencyObject);
                } else if (user.role === CONSTANTS.ROLE.ADMIN) {
                    user = _.merge(user, token);
                } else if (user.role === CONSTANTS.ROLE.RECRUITER) {
                    const recruiterObject = await Recruiter.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    user = _.merge(user, token, recruiterObject);
                } else if (user.role === CONSTANTS.ROLE.AMBASSADOR) {
                    const ambassadorObject = await Ambassador.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                    user = _.merge(user, token, ambassadorObject);
                }
                return user;
            }
        } else if (user.isActive === 2) {
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else if (user.isActive === 0 && await this.checkAgencyTalentSignIn(userEmail)) {
            // Wrong Password
            const isMatch = await crypt.comparePassword(password, user.password);
            if (!isMatch) {
                throw new CodeMonkError(local('LOGIN_FAIL'), 401);
            } else {
                return await this.agencyTalentSignIn(userEmail, local);
            }
        } else {
            await SignInService.resendLink(user, password, local);
        }
    }

    static async checkAgencyTalentSignIn (email) {
        const agencyTalent = await AgencyTalent.findOne({
            'talents.email': email.toLowerCase()
        }, {
            _id: 1,
            talents: { $elemMatch: { email: email.toLowerCase() } }
        }).exec();

        if (agencyTalent &&
            email.toLowerCase() === agencyTalent.talents[0].email
        ) {
            return true;
        } else {
            return false;
        }
    }

    static async agencyTalentSignIn (email, local) {
        const agencyTalent = await AgencyTalent.findOne({
            'talents.email': email.toLowerCase()
        }, {
            _id: 1,
            talents: { $elemMatch: { email: email.toLowerCase() } }
        }).exec();

        if (agencyTalent &&
            email.toLowerCase() === agencyTalent.talents[0].email
        ) {

            await AgencyTalent.updateOne({
                _id: agencyTalent._id,
                'talents.email': email.toLowerCase()
            }, {
                $set: {
                    'talents.$.isInviteAccept': true
                }
            });

            const updatedUser = await User.findOneAndUpdate({ email: agencyTalent.talents[0].email }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE
                }
            }, { new: true }).lean();

            const code = await this.generateTalentCode();
            const talentObject = await Talent.findOneAndUpdate({ userId: updatedUser._id }, {
                $set: {
                    signupStep: 0.1,
                    code,
                    version: 'v2'
                }
            }, { new: true }).lean();
            const token = await crypt.getUserToken(updatedUser);
            const userData = _.merge(updatedUser, token, talentObject);
            delete userData.password;
            delete userData.__v;
            return userData;
        } else {
            throw new CodeMonkError(local('NOT_FOUND', 'User'), 400);
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

    static async resendLink (user, password, local) {
        if (user.role !== CONSTANTS.ROLE.TALENT) {
            throw new CodeMonkError(local('USER_INACTIVE'), 423);
        }
        const talentObject = await Talent.find({
            userId: user._id
        }, {
            registerType: 1
        }).lean();
        console.log(talentObject, user._id);

        if (talentObject.registerType == TALENT_REGISTER_TYPE.FREELANCER) {
            const isMatch = await crypt.comparePassword(password, user.password);
            if (!isMatch) {
                throw new CodeMonkError(local('LOGIN_FAIL'), 401);
            }
        }

        user.otp = generateOtp();
        const subject = 'Lets invent the future of work with CodeMonk';
        const template = 'emailTemplates/verificationOtpMail.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        const templateVariables = { appUrl, otp: user.otp };
        await Email.prepareAndSendEmail([user.email], subject, template, templateVariables);
        await User.updateOne({ _id: user._id }, { $set: { otp: user.otp } });
        throw new CodeMonkError(local('REGISTER_SUCCESS'), 207);
    }
}

module.exports = SignInService;
