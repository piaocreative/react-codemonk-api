const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const TalentPreferenceDetailsValidator = require('./talentPreferenceDetailsValidator');
const EngageBay = require('../engageBay/engageBay');
const utils = require('../../util/utilFunctions');

/**
 * Class represents services for Talent Preference Details.
 */
class TalentPreferenceDetailsService {

    /**
     * @desc This function is being used to store preference details of talent user
     * @author Innovify
     * @since 09/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.teamPreference teamPreference
     * @param {Object} req.body.assignments assignments
     * @param {Object} req.body.workPreference workPreference
     * @param {Object} req.body.availability availability
     * @param {Object} req.body.unavailability unavailability
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserPreferenceDetails(req, user, local) {
        const Validator = new TalentPreferenceDetailsValidator(req.body, local);
        await Validator.validationPreferenceDetails();
        await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                industries: (req.body.industries && req.body.industries.length)
                    ? req.body.industries : [],
                companyCultures: (req.body.companyCultures && req.body.companyCultures.length)
                    ? req.body.companyCultures : [],
                companyType: (req.body.companyType) ? req.body.companyType : [],
                preferredProjectDuration: (req.body.preferredProjectDuration) ? req.body.preferredProjectDuration : [],
                teamPreference: (req.body.teamPreference && req.body.teamPreference.length)
                    ? req.body.teamPreference : [],
                assignments: (req.body.assignments && req.body.assignments.length)
                    ? req.body.assignments : [],
                workPreference: req.body.workPreference,
                availability: (req.body.availability && req.body.availability !== 'undefined')
                    ? req.body.availability : false,
                unavailability: (req.body.unavailability && req.body.unavailability.length)
                    ? req.body.unavailability : [],
                signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.PREFERENCE_DETAIL
            }
        });

        if (user.registerType === 'agency') {
            EngageBay.updateEngageBayContactTags(user.email, ['talent', 'active'], utils.getEngageBayContactProproperties(user));
        } else {
            EngageBay.updateEngageBayContactTags(user.email, ['talent', 'active'], utils.getEngageBayContactProproperties(user));
        }
    }
}

module.exports = TalentPreferenceDetailsService;
