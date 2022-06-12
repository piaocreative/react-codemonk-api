
const TalentListService = require('./talentListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent list based on status filter
 */
class TalentListController {

    /**
     * @desc This function is being used to get talent list based on status filter
     * @author Innovify
     * @since 26/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list(req, res) {
        const data = await TalentListService.list(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }

    /**
     * @desc This function is being used to get talent list based on status filter
     * @author codemonk
     * @since 31/01/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async log(req, res) {
        const data = await TalentListService.log(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = TalentListController;
