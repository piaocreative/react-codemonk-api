
const AgencyProfileService = require('./agencyProfileService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency profile save
 */
class AgencyProfileController {

    /**
     * @desc This function is being used to agency profile save step1
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateProfile (req, res) {
        try {
            const data = await AgencyProfileService.updateProfile(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyProfileController;
