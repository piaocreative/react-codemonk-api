
const ClientProjectsCountService = require('./clientProjectsCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client projects count
 */
class ClientProjectsCountController {

    /**
     * @desc This function is being used to client projects Count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await ClientProjectsCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientProjectsCountController;
