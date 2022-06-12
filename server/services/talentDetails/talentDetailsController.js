
const TalentDetailsService = require('./talentDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent details
 */
class TalentDetailsController {

    /**
     * @desc This function is being used to get talent details
     * @author Innovify
     * @since 17/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await TalentDetailsService.details(req.params.id, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
    /**
     * @desc This function is being used to get talent details
     * @author Innovify
     * @since 05/02/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async downloadProfile (req, res) {
        try {
            const data = await TalentDetailsService.downloadProfile(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = TalentDetailsController;
