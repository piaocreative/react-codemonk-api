
const AgencyTalentsCountService = require('./agencyTalentsCountService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency project talents count
 */
class AgencyTalentsCountController {

    /**
     * @desc This function is being used to agency project talents Count
     * @author Innovify
     * @since 30/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async count (req, res) {
        const data = await AgencyTalentsCountService.count(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyTalentsCountController;
