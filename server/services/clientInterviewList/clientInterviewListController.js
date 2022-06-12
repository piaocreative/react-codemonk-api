
const ClientInterviewListService = require('./clientInterviewListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client interview list based on search query
 */
class ClientInterviewListController {

    /**
     * @desc This function is being used to client interview list
     * @author Innovify
     * @since 08/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await ClientInterviewListService.list(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientInterviewListController;
