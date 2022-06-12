
const AgencyTalentListService = require('./agencyTalentListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency list list based on status
 */
class AgencyTalentListController {

    /**
     * @desc This function is being used to get project list based on status
     * @author Innovify
     * @since 28/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async agencyTalentList (req, res) {
        const data = await AgencyTalentListService.agencyTalentList(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyTalentListController;
