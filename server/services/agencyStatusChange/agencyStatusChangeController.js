
const AgencyStatusChangeService = require('./agencyStatusChangeService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Agency status change
 */
class AgencyStatusChangeController {

    /**
     * @desc This function is being used to agency status change
     * @author Innovify
     * @since 07/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await AgencyStatusChangeService.changeStatus(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AgencyStatusChangeController;
