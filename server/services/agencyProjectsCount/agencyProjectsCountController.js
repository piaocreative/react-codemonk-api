
const AgencyProjectsCountService = require('./agencyProjectsCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency projects count
 */
class AgencyProjectsCountController {

    /**
     * @desc This function is being used to agency projects Count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await AgencyProjectsCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyProjectsCountController;
