
const ListService = require('./listService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for ambassador list based on status filter
 */
class ListController {

    /**
     * @desc This function is being used to get ambassador list based on status filter
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await ListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ListController;
