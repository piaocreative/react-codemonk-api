
const AgencyCredentialsEditService = require('./agencyCredentialsEditService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency edit credetials
 */
class AgencyCredentialsEditController {

    /**
     * @desc This function is being used to agency edit credetials
     * @author Innovify
     * @since 06/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editCredentials (req, res) {
        try {
            const data = await AgencyCredentialsEditService.editCredentials(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyCredentialsEditController;
