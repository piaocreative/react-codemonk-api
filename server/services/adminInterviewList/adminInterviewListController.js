
const AdminInterviewListService = require('./adminInterviewListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin interview list based on search query
 */
class AdminInterviewListController {

    /**
     * @desc This function is being used to admin interview list
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await AdminInterviewListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AdminInterviewListController;
