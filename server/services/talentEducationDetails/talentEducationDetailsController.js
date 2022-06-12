
const TalentPayDetailsService = require('./talentEducationDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Education Details.
 */
class TalentEducationDetailsController {

    /**
     * @desc This function is being used to store education and certificate details of talent user
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveTalentEducationDetails (req, res) {
        try {
            const data = await TalentPayDetailsService
                .saveTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentEducationDetailsController;
