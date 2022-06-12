
const TalentPayDetailsService = require('./talentPayDetailsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Pay Details.
 */
class TalentPayDetailsController {

    /**
     * @desc This function is being used to store pay details of talent user
     * @author CodeMonk
     * @since 28/10/2021
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
