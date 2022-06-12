
const AgencyCertificateDetailsService = require('./agencyCertificateDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency update certificate and credetials
 */
class AgencyCertificateDetailsController {

    /**
     * @desc This function is being used to agency update certificate and credetials
     * @author Innovify
     * @since 02/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateCertificate (req, res) {
        try {
            const data = await AgencyCertificateDetailsService
                .updateCertificate(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyCertificateDetailsController;
