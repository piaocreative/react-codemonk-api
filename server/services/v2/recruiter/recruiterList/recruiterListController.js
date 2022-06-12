
const RecruiterListService = require('./recruiterListService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for recruiter list based on status filter
 */
class RecruiterListController {

    /**
     * @desc This function is being used to get recruiter list based on status filter
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await RecruiterListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = RecruiterListController;
