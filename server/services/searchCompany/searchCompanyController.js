const SearchCompanyService = require('./searchCompanyService')
const Utils = require('../../util/utilFunctions')
class SearchCompanyController {

    static async searchCompany(req, res) {
        try {
            const data = await SearchCompanyService.searchCompany(req, res.__)
            Utils.sendResponse(null, data, res, res.__('SUCCESS_FETCH_COMPANY'))
        } catch (exception) {
            Utils.sendResponse(exception, null, res, error.message)
        }
    }

}

module.exports = SearchCompanyController