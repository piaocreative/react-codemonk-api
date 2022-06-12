const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const AgencyTalent = require('../../models/agencyTalent.model.js');
const AgencyEditTalentValidator = require('./agencyEditTalentValidator');
const CodeMonkError = require('../../util/CodeMonkError');
const mongoose = require('mongoose');
const Email = require('../../util/sendEmail');
const UtilFunctions = require('../../util/utilFunctions');
const AgencyCreateTalentsService = require('../agencyCreateTalents/agencyCreateTalentsService');

/**
 * Class represents services for agency edit talent
 */
class AgencyEditTalentService {

    /**
     * @desc This function is being used to agency edit a talent
     * @author Innovify
     * @since 28/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user Logged in user details
     * @param {function} res Response
     */
    static async editTalent(req, user, local) {
        let talentDetails = {};
        const Validator = new AgencyEditTalentValidator(req.body, local);
        await Validator.validateEditTalent();
        const talentData = await User.findById(req.body.talentId, ['email']);
        let reInvite = false;
        if (talentData.email !== req.body.email) {
            const isExistingUser = await User.findOne({ email: req.body.email });
            if (isExistingUser) {
                const isAgencyAlreadyAddedThisTalent = await AgencyTalent.findOne({
                    agencyId: mongoose.Types.ObjectId(user._id),
                    'talents.email': req.body.email.toLowerCase()
                }, { _id: 1 });

                if (isAgencyAlreadyAddedThisTalent) {
                    throw new CodeMonkError(local('AGENCY_ALREADY_ADDED_THIS_TALENT'), 400);
                }
            }
        } else {
            const existUser = await User.findById(req.body.talentId, ['email', 'firstName', 'lastName']);
            const existTalent = await Talent.findOne({ userId: req.body.talentId }, { currency: 1, ratePerHour: 1 }).lean();
            reInvite = existTalent && existUser.firstName === req.body.firstName &&
                existUser.lastName === req.body.lastName &&
                existTalent.currency === req.body.currency &&
                existTalent.ratePerHour === req.body.rate &&
                existUser.email === req.body.email
            if (existTalent && (!(existTalent.currency === req.body.currency) || !(existTalent.ratePerHour === req.body.rate))) {
                await Validator.checkActiveProject(req.body.talentId, user.proxyUser);
            }

        }
        if (user.signupStep && user.signupStep >= CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
            await AgencyTalent.findOneAndUpdate({
                agencyId: user._id,
                'talents.email': talentData.email
            }, {
                $set: {
                    'talents.$.firstName': req.body.firstName,
                    'talents.$.lastName': req.body.lastName,
                    'talents.$.currency': req.body.currency,
                    'talents.$.rate': req.body.rate,
                    'talents.$.email': req.body.email
                }
            }, { upsert: true, new: true });

            talentDetails = await User.findOneAndUpdate({
                _id: req.body.talentId
            }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            }, { new: true });
            const ratePerHour = UtilFunctions.round(req.body.rate, 2);;
            const ratePerDay = UtilFunctions.round(req.body.rate * 7.5, 2);
            const ratePerMonth = UtilFunctions.round(req.body.rate * 157.5, 2);

            await Talent.updateOne({
                userId: talentDetails._id
            }, {
                $set: {
                    currency: req.body.currency,
                    ratePerHour,
                    ratePerDay,
                    ratePerMonth
                }
            });
        } else {
            const isExistingUser = await User.findOne({ email: talentData.email });
            if (isExistingUser) {
                throw new CodeMonkError(local('TALENT_EXISTS'), 400);
            }

            await AgencyTalent.findOneAndUpdate({
                agencyId: user._id,
                'talents.email': talentData.email
            }, {
                $set: {
                    'talents.$.email': req.body.email,
                    'talents.$.firstName': req.body.firstName,
                    'talents.$.lastName': req.body.lastName,
                    'talents.$.currency': req.body.currency,
                    'talents.$.rate': req.body.rate
                }
            }, { new: true });
        }
        if (req.body.email !== talentData.email) {
            const userD = await User.findOneAndUpdate({
                _id: req.body.talentId
            }, {
                $set: {
                    email: req.body.email,
                    otp: UtilFunctions.generateOtp(),
                    isActive: 0
                }
            }, { new: true });
            const agencyName = `${user.firstName} ${user.lastName}`;
            const subject = `${agencyName} updated your email address, please verify`;
            const template = 'emailTemplates/verificationChangeEmail.html';
            const appUrl = process.env.FRONTEND_URL_TALENT;
            const templateVariables = {
                appUrl,
                agencyName,
                signupUrl: `${appUrl}/verification-mail/${Buffer.from(req.body.email).toString('base64')}`,
                talentName: `${userD.firstName} ${userD.lastName}`,
                otp: userD.otp
            };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
        }

        if (reInvite && user.signupStep && user.signupStep >= CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
            const agencyTalent = await AgencyTalent.findOne({
                agencyId: mongoose.Types.ObjectId(user._id),
                'talents.email': req.body.email.toLowerCase()
            }, {
                _id: 0,
                talents: { $elemMatch: { email: req.body.email.toLowerCase() } }
            });
            if (!agencyTalent.talents[0].isInviteAccept) {
                await AgencyCreateTalentsService.sendInviteToAgencyTalent(req.body, user, agencyTalent.talents[0]._id);
            }
        }
    }
}

module.exports = AgencyEditTalentService;
