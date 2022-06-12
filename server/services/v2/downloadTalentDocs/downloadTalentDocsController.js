const DownloadTalentDocsService = require('./downloadTalentDocsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for downloading the talent document
 */
class DownloadTalentDocsController {

    static async downloadTalentDocs (req, res) {
        try {
            const data = await DownloadTalentDocsService.downloadTalentDocs(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('DOWNLOAD_DOCUMENT_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }
}

module.exports = DownloadTalentDocsController;
