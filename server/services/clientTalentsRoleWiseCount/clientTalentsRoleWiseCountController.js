
const ClientTalentsRoleWiseCountService = require('./clientTalentsRoleWiseCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client project talents role wise count
 */
class ClientTalentsRoleWiseCountController {

    /**
     * @desc This function is being used to client project talents role wise Count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await ClientTalentsRoleWiseCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ClientTalentsRoleWiseCountController;
