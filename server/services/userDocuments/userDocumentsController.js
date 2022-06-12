
const UserProfileService = require('./userDocumentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for user documents.
 */
class UserDocumentController {
    /**
     * @desc This function is being used to upload pay documents
     * @author Innovify
     * @since 12/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadPayDocuments (req, res) {
        try {
            const data = await UserProfileService.uploadPayDocuments(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete pay documents
     * @author Innovify
     * @since 12/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteuserDocument (req, res) {
        try {
            const data = await UserProfileService.deleteuserDocument(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = UserDocumentController;
