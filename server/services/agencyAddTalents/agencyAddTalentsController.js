
const AgencyAddTalentsService = require('./agencyAddTalentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency add talents
 */
class AgencyAddTalentsController {

    /**
     * @desc This function is being used to agency add talents
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalents (req, res) {
        const data = await AgencyAddTalentsService.addTalents(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = AgencyAddTalentsController;
