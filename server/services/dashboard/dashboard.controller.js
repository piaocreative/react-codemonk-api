
const DashboardService = require('./dashboard.services');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin edit job post details.
 */
class DashboardController {

    /**
     * @desc This function is being used to edit admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async adminKPIs (req, res) {
        const data = await DashboardService.adminKPIs(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = DashboardController;
