const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyTalent = require('../../models/agencyTalent.model.js');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');
const AgencyCreateTalentsValidator = require('./agencyCreateTalentsValidator');
const EngageBay = require('../engageBay/engageBay');
const utils = require('../../util/utilFunctions');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services for agency profile save
 */
class AgencyCreateTalentsService {

    /**
     * @desc This function is being used to create/invite agency talent(s) on success onboarding
     * @author Innovify
     * @since 04/09/2020
     * @param {Object} user logged in user object
     * @param {function} res Response
     */
    static async inviteAgencyTalents (user) {
        const talents = await AgencyTalent.findOne({
            agencyId: mongoose.Types.ObjectId(user._id)
        }).lean();

        if (talents && talents.talents && talents.talents.length) {
            await Promise.all(talents.talents.map(async (t) => {
                const isExistingUser = await User.findOne({ email: t.email });
                if (!isExistingUser) {
                    await AgencyCreateTalentsService.createAgencyTalent(t, user, t._id);
                }
            }));
        }

        EngageBay.updateEngageBayContactTags(user.email, ['agency', 'active', 'notdd'], utils.getEngageBayContactProproperties(user));

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL
            }
        });
    }

    /**
     * @desc This function is being used to add agency talent(s)
     * @author Innovify
     * @since 04/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addAgencyTalent (req, user, local) {
        const Validator = new AgencyCreateTalentsValidator(req.body, local);
        await Validator.validateTalent();
        const isExistingUser = await User.findOne({ email: req.body.email });
        if (!isExistingUser) {
            const isAgencyAlreadyAddedThisTalent = await AgencyTalent.findOne({
                agencyId: mongoose.Types.ObjectId(user._id),
                'talents.email': req.body.email.toLowerCase()
            }, { _id: 1 });

            if (isAgencyAlreadyAddedThisTalent) {
                throw new CodeMonkError(local('AGENCY_ALREADY_ADDED_THIS_TALENT'), 400);
            }


            await AgencyTalent.updateOne({
                agencyId: mongoose.Types.ObjectId(user._id)
            }, {
                $addToSet: {
                    talents: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email.toLowerCase(),
                        currency: req.body.currency,
                        rate: req.body.rate
                    }
                }
            }, { upsert: true });

            if (user.signupStep && user.signupStep >= CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
                const agencyTalent = await AgencyTalent.findOne({
                    agencyId: mongoose.Types.ObjectId(user._id),
                    'talents.email': req.body.email.toLowerCase()
                }, {
                    _id: 0,
                    talents: { $elemMatch: { email: req.body.email.toLowerCase() } }
                });
                await AgencyCreateTalentsService.createAgencyTalent(req.body, user, agencyTalent.talents[0]._id);
            }

        } else {
            throw new CodeMonkError(local('TALENT_EXISTS'), 400);
        }
    }

    /**
     * @desc This function is being used to add agency talent
     * @author Innovify
     * @since 04/09/2020
     * @param {Object} data data
     * @param {Object} user Agency user data
     * @param {string} agencyTalentId agency talent id
     */
    static async createAgencyTalent (data, user, agencyTalentId) {
        const role = CONSTANTS.ROLE.TALENT;
        const isActive = CONSTANTS.STATUS.PENDING;

        const agencyTalent = await User.create({
            role,
            email: data.email.toLowerCase(),
            firstName: data.firstName,
            lastName: data.lastName,
            isActive
        });

        const ratePerHour = utils.round(data.rate, 2);
        const ratePerDay = utils.round(data.rate * 7.5, 2);
        const ratePerMonth = utils.round(data.rate * 157.5, 2);


        await Talent.create({
            userId: agencyTalent._id,
            registerType: CONSTANTS.TALENT_REGISTER_TYPE.AGENCY,
            currency: data.currency,
            ratePerHour,
            ratePerDay,
            ratePerMonth,
            employmentType: [CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR]
        });

        EngageBay.createEngageBayContact(agencyTalent, ['talent', 'incomplete']);
        await AgencyCreateTalentsService.sendInviteToAgencyTalent(data, user, agencyTalentId);
    }

    static async sendInviteToAgencyTalent (data, user, agencyTalentId) {

        const agencyName = `${user.firstName} ${user.lastName}`;
        const subject = `${agencyName} invited you to complete your CodeMonk profile`;
        const template = 'emailTemplates/agencyInviteTalent.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        const templateVariables = {
            appUrl,
            agencyName,
            signupUrl: `${appUrl}/signup/${agencyTalentId}`,
            talentName: `${data.firstName} ${data.lastName}`
        };
        await Email.prepareAndSendEmail([data.email], subject, template, templateVariables);
    }
}

module.exports = AgencyCreateTalentsService;
