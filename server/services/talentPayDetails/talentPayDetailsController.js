
const TalentPayDetailsService = require('./talentPayDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Pay Details.
 */
class TalentPayDetailsController {

    /**
     * @desc This function is being used to store pay details of talent user
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveUserPayDetails (req, res) {
        try {
            const data = await TalentPayDetailsService
                .savePayDetailsService(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentPayDetailsController;
