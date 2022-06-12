
const AgencyProjectListService = require('./agencyProjectListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency project list based on status
 */
class AgencyProjectListController {

    /**
     * @desc This function is being used to get agency project list based on status
     * @author Innovify
     * @since 28/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await AgencyProjectListService.list(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyProjectListController;
