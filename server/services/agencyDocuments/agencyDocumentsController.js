
const AgencyDocumentService = require('./agencyDocumentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency documents.
 */
class AgencyDocumentController {
    /**
     * @desc This function is being used to upload agency documents
     * @author Innovify
     * @since 01/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadAgencyDocuments (req, res) {
        try {
            const data = await AgencyDocumentService.uploadAgencyDocuments(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete agency documents
     * @author Innovify
     * @since 01/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteAgencyDocuments (req, res) {
        try {
            const data = await AgencyDocumentService.deleteAgencyDocuments(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = AgencyDocumentController;
