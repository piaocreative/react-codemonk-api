
const ClientTalentsCountService = require('./clientTalentsCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client project talents count
 */
class ClientTalentsCountController {

    /**
     * @desc This function is being used to client project talents Count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await ClientTalentsCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientTalentsCountController;
