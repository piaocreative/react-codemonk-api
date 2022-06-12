const mongoose = require('mongoose');
const crypt = require('../../util/crypt');
const signUpValidator = require('./signUpValidator');
const UtilFunctions = require('../../util/utilFunctions');
const AssignReferrerToTalentService = require('../v2/assignReferrerToTalent/assignReferrerToTalentService');
const TalentReferralLogService = require('../v2/talentReferralLog/talentReferralLogService');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const Client = require('../../models/client.model');
const Agency = require('../../models/agency.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const Email = require('../../util/sendEmail');
const EngageBay = require('../engageBay/engageBay');
const CodeMonkError = require('../../util/CodeMonkError');
const Recruiter = require('../../models/recruiter.model');
const Ambassador = require('../../models/ambassador.model');
const Hubspot = require('../hubSpot/hubSpot');

/**
 * Class represents services for Sign-up.
 */
class SignUpService {

    /**
     * @desc This function is being used to signUp talent user
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     */
    static async signUp (req, local) {
        const Validator = new signUpValidator(req.body, local);
        await Validator.validate();
        req.body.email = req.body.email.toLowerCase();
        const user = await SignUpService.isUserAlreadyRegister(req.body);

        if (!user) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = req.body.userType;
            const otp = UtilFunctions.generateOtp();
            await SignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = (userType === 1) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (user.isActive === 2) {
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else if (user.isActive === 0 && user.role === CONSTANTS.ROLE.TALENT && await SignUpService.checkFreelancerTalentSignIn(user._id)) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const userType = user.role;
            const otp = UtilFunctions.generateOtp();
            await SignUpService.updateRegistrationUser(user, hash, otp);
            const subject = 'Lets invent the future of work with CodeMonk';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = (userType === 1) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);

            return { email: req.body.email, role: userType };
        } else if (user.isActive === 0 && user.role === CONSTANTS.ROLE.TALENT && await SignUpService.checkAgencyTalentSignIn(user._id)) {
            throw new CodeMonkError(local('TALENT_IS_INVITED_BY_AGENCY'), 452);
        } else {
            return await SignUpService.checkLogin(req.body.password, user, local);
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

    static async checkLogin (password, user, local) {
        const isMatch = await crypt.comparePassword(password, user.password);
        let otherDetails = {};
        if (!isMatch) {
            throw new CodeMonkError(local('ALREADY_REGISTER'), 422);
        } else if (user.isActive === 0) {
            await SignUpService.reSendOTPByUser(user, user.email);
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

    /**
     * @desc This function is being used to check email already exists for sign-up of talent
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} reqObj reqObj
     */
    static async isUserAlreadyRegister (reqObj) {
        const where = { email: reqObj.email };
        return await User.findOne(where).lean();
    }

    static async generateTalentCode () {
        const code = await crypt.generateCode();
        const talent = await Talent.find({ code: code }).limit(1).select('userId');
        if (talent.length > 0) {
            return await this.generateTalentCode();
        }
        return code;
    }
    /**
     * @desc This function is being used to save or update talent details
     * @author Innovify
     * @since 26/05/2020
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
            await Talent.create({ userId: userDetails._id, code });
            EngageBay.createEngageBayContact(userDetails, ['talent', 'incomplete']);
        } else {
            await Client.create({ userId: userDetails._id });
            EngageBay.createEngageBayContact(userDetails, ['client', 'incomplete']);
        }
        if (reqObj.referral) {
            // DB update - Referral: Update "refereeUserId", "referredOn" where "refererUserId".
            await AssignReferrerToTalentService.assignReferrerToTalent(userDetails, reqObj.referral);
        }
    }

    static async updateRegistrationUser (user, hash, otp) {
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
                    code
                }
            });
            EngageBay.createEngageBayContact(user, ['talent', 'incomplete']);
        }
    }



    /**
     * @desc This function is being used to verify talent account
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async verifyAccount (req, local) {
        const Validator = new signUpValidator(req.body, local);
        await Validator.otpValidate();
        req.body.email = req.body.email.toLowerCase();
        let user = await User.findOne({ email: req.body.email }).lean();
        if (user && user.otp === req.body.otp) {
            // DB update - Referral: Update "daysOfRefereeActivated" where "refereeUserId".
            await TalentReferralLogService.updateReferralLog(user._id, 'Active');
            await User.updateOne({ _id: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE
                }
            });
            if (user.role === CONSTANTS.ROLE.TALENT) {
                Talent.updateOne({ userId: user._id }, {
                    $set: {
                        isActive: CONSTANTS.STATUS.ACTIVE
                    }
                });
            } else if (user.role === CONSTANTS.ROLE.RECRUITER) {
                Recruiter.updateOne({ userId: user._id }, {
                    $set: {
                        isActive: CONSTANTS.STATUS.ACTIVE
                    }
                });
            }  else if (user.role === CONSTANTS.ROLE.AMBASSADOR) {
                Ambassador.updateOne({ userId: user._id }, {
                    $set: {
                        isActive: CONSTANTS.STATUS.ACTIVE
                    }
                });
            } else {
                Client.updateOne({ userId: user._id }, {
                    $set: {
                        isActive: CONSTANTS.STATUS.ACTIVE
                    }
                });
            }
            const token = await crypt.getUserToken(user);
            delete user.password;
            delete user.__v;
            if (user.role === CONSTANTS.ROLE.TALENT) {
                const talentObject = await Talent.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                user = _.merge(user, token, talentObject);
            } else if (user.role === CONSTANTS.ROLE.CLIENT) {
                user = _.merge(user, token);

                // Create hubspot contact, don't wait.
                Hubspot.createContact(user, { 'platform_status': CONSTANTS.HUBSPOT.PLATFORM_STATUSES.REGISTERED });

            } else if (user.role === CONSTANTS.ROLE.RECRUITER || user.role === CONSTANTS.ROLE.AMBASSADOR) {
                user = _.merge(user, token);
            }
            return user;
        } else {
            throw new CodeMonkError(local('INVALID_OTP'), 400);
        }
    }

    /**
     * @desc This function is being used to resent OTP in case of email not received
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async resentOTP (req, local) {
        const Validator = new signUpValidator(req.body, local);
        await Validator.email(req.body.email);
        req.body.email = req.body.email.toLowerCase();
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            return await SignUpService.reSendOTPByUser(user, req.body.email);
        } else {
            throw new CodeMonkError(local('NOT_FOUND', 'User'), 400);
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

    /**
     * @desc This function is being used to get agency talent email from token id
     * @author Innovify
     * @since 08/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.token token is nothing but user id
     * @param {Object} res Response
     */
    static async getEmailFromToken (req, local) {
        const Validator = new signUpValidator(req.query, local);
        await Validator.checkId(req.query.token);

        const id = mongoose.Types.ObjectId(req.query.token);
        const agencyTalent = await AgencyTalent.findOne({
            'talents._id': id
        }, {
            _id: 1,
            talents: { $elemMatch: { _id: id } }
        }).exec();

        let email = '';

        if (agencyTalent && agencyTalent.talents && agencyTalent.talents.length) {
            email = agencyTalent.talents[0].email;
        }

        return email;

    }

    /**
     * @desc This function is being used to signUp agency talent user upon invite
     * @author Innovify
     * @since 08/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.token token is nothing but user id
     * @param {Object} res Response
     */
    static async agencyTalentSignUp (req, local) {
        const Validator = new signUpValidator(req.body, local);
        await Validator.validateTalentSignup();
        const id = mongoose.Types.ObjectId(req.body.token);
        const agencyTalent = await AgencyTalent.findOne({
            'talents._id': id
        }, {
            _id: 1,
            talents: { $elemMatch: { _id: id } }
        }).exec();

        if (agencyTalent &&
            req.body.email.toLowerCase() === agencyTalent.talents[0].email
            && !agencyTalent.talents[0].isInviteAccept) {
            const hash = await crypt.enCryptPassword(req.body.password);

            await AgencyTalent.updateOne({
                _id: agencyTalent._id,
                'talents._id': id
            }, {
                $set: {
                    'talents.$.isInviteAccept': true
                }
            });

            const updatedUser = await User.findOneAndUpdate({ email: agencyTalent.talents[0].email }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE,
                    password: hash
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
            throw new CodeMonkError(Validator.__('NOT_FOUND', 'User'), 400);
        }
    }
}

module.exports = SignUpService;
