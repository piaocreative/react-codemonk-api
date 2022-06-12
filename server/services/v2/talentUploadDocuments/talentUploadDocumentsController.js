
const TalentUploadDocumentsService = require('./talentUploadDocumentsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Upload Documents.
 */
class TalentUploadDocumentsController {

    /**
     * @desc This function is being used to upload documents
     * @author CodeMonk
     * @since 30/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadDocuments (req, res) {
        try {
            const data = await TalentUploadDocumentsService.uploadDocuments(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('BILLING_SUCCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentUploadDocumentsController;
