
const ClientTalentListService = require('./clientTalentListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client talent list based on search query
 */
class ClientTalentListController {

    /**
     * @desc This function is being used to client talents list
     * @author Innovify
     * @since 13/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async clientTalents (req, res) {
        const data = await ClientTalentListService.clientTalents(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientTalentListController;
