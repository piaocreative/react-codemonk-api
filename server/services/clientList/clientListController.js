
const ClientListService = require('./clientListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client list based on status filter
 */
class ClientListController {

    /**
     * @desc This function is being used to get client list based on status filter
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await ClientListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientListController;
