
const CompanyCulturesService = require('./companyCulturesServices');
const Utils = require('../../util/utilFunctions');

class CompanyCulturesController {

    static async companyCultures(req, res) {
        const data = await CompanyCulturesService.companyCultures(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = CompanyCulturesController;
