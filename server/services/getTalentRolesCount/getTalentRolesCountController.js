
const TalentRolesCountService = require('./getTalentRolesCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for get talent roles counts
 */
class TalentRolesCountController {

    /**
     * @desc This function is being used to get talent roles counts
     * @author Innovify
     * @since 30/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async getTalentRolesCount (req, res) {
        const data = await TalentRolesCountService.getTalentRolesCount();
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = TalentRolesCountController;
