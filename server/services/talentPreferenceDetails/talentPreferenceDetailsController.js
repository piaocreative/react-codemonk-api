
const PreferenceProfileService = require('./talentPreferenceDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Preference Details.
 */
class TalentPreferenceDetailsController {

    /**
     * @desc This function is being used to store preference details of talent user
     * @author Innovify
     * @since 09/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveUserPreferenceDetails (req, res) {
        try {
            const data = await PreferenceProfileService
                .saveUserPreferenceDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentPreferenceDetailsController;
