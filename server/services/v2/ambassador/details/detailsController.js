
const DetailsService = require('./detailsService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for ambassador details based on it's id
 */
class DetailsController {

    /**
     * @desc This function is being used to get ambassador details based on it's id
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await DetailsService.details(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = DetailsController;
