
const ReferralListService = require('./referralListService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for referral list based on status filter
 */
class ReferralListController {

    /**
     * @desc This function is being used to get referral list based on status filter
     * @author CodeMonk
     * @since 07/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await ReferralListService.list(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ReferralListController;
