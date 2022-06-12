
const AgencyUploadTalentsService = require('./agencyUploadTalentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency upload multiple talents
 */
class AgencyUploadTalentsController {

    /**
     * @desc This function is being used to agency upload multiple talents
     * @author Innovify
     * @since 29/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadTalentList (req, res) {
        try {
            const data = await AgencyUploadTalentsService.uploadTalentList(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyUploadTalentsController;
