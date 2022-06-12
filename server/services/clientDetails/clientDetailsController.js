
const ClientDetailsService = require('./clientDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client details based on it's id
 */
class ClientDetailsController {

    /**
     * @desc This function is being used to get client details based on it's id
     * @author Innovify
     * @since 26/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await ClientDetailsService.details(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = ClientDetailsController;
