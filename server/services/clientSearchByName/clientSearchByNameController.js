
const ClientListService = require('./clientSearchByNameService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client list based in name search
 */
class ClientListController {

    /**
     * @desc This function is being used to get client list based in name search
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async searchByName (req, res) {
        try {
            const data = await ClientListService.searchByName(req);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = ClientListController;
