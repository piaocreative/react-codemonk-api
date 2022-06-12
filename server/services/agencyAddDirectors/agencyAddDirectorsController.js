
const AgencyDirectorsDetailsService = require('./agencyAddDirectorsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency update directors/shareholders details
 */
class AgencyDirectorsDetailsController {

    /**
     * @desc This function is being used to agency update directors/shareholders details
     * @author Innovify
     * @since 03/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateDirectorsDetails (req, res) {
        try {
            const data = await AgencyDirectorsDetailsService.updateDirectorsDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyDirectorsDetailsController;
