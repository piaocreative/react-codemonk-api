
const AgencyPayDetailsService = require('./agencyPayDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency pay details update
 */
class AgencyPayDetailsController {

    /**
     * @desc This function is being used to agency pay details update
     * @author Innovify
     * @since 31/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updatePayDetails (req, res) {
        try {
            const data = await AgencyPayDetailsService.updatePayDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, data.message);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyPayDetailsController;
