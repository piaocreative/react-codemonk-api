const SearchCertificationService = require('./searchCertificationService')
const Utils = require('../../../util/utilFunctions')
class SearchCertificationController {

    static async searchCertification(req, res) {
        try {
            const data = await SearchCertificationService.searchCertification(req, res.__)
            Utils.sendResponse(null, data, res, res.__('SUCCESS_FETCH_CERTIFICATION'))
        } catch (exception) {
            Utils.sendResponse(exception, null, res, exception.message)
        }
    }

}

module.exports = SearchCertificationController