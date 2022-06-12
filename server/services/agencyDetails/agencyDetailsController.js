
const AgencyDetailsService = require('./agencyDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency details based on it's id
 */
class AgencyDetailsController {

    /**
     * @desc This function is being used to get agency details based on it's id
     * @author Innovify
     * @since 26/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await AgencyDetailsService.details(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyDetailsController;
