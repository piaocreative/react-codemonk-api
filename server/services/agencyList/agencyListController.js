
const AgencyListService = require('./agencyListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency list based on status filter
 */
class AgencyListController {

    /**
     * @desc This function is being used to get agency list based on status filter
     * @author Innovify
     * @since 03/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await AgencyListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyListController;
