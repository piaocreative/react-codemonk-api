
const ClientProjectListService = require('./clientProjectListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client project list based on search query
 */
class ClientProjectListController {

    /**
     * @desc This function is being used to client project list
     * @author Innovify
     * @since 08/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async clientProjects (req, res) {
        const data = await ClientProjectListService.clientProjects(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientProjectListController;
