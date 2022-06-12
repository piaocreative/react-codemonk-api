
const AgencyCertificateEditService = require('./agencyCertificateEditService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency edit certificates
 */
class AgencyCertificateEditController {

    /**
     * @desc This function is being used to agency edit certificates
     * @author Innovify
     * @since 06/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editCertificates (req, res) {
        try {
            const data = await AgencyCertificateEditService.editCertificates(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyCertificateEditController;
