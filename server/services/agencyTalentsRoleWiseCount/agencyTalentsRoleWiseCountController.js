
const AgencyTalentsRoleWiseCountService = require('./agencyTalentsRoleWiseCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency project talents role wise count
 */
class AgencyTalentsRoleWiseCountController {

    /**
     * @desc This function is being used to agency project talents role wise Count
     * @author Innovify
     * @since 30/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await AgencyTalentsRoleWiseCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyTalentsRoleWiseCountController;
