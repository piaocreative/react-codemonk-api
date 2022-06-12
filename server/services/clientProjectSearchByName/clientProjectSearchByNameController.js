
const ClientProjectSearchByNameService = require('./clientProjectSearchByNameService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client project list based on search query
 */
class ClientProjectSearchByNameController {

    /**
     * @desc This function is being used to client project list based on search query
     * @author Innovify
     * @since 01/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async clientProjectSearchByName (req, res) {
        const data = await ClientProjectSearchByNameService.clientProjectSearchByName(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientProjectSearchByNameController;
