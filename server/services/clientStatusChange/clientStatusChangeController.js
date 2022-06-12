
const ClientStatusChangeService = require('./clientStatusChangeService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Client status change
 */
class ClientStatusChangeController {

    /**
     * @desc This function is being used to client status change
     * @author Innovify
     * @since 13/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await ClientStatusChangeService.changeStatus(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ClientStatusChangeController;
