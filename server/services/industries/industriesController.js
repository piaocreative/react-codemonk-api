
const IndustriesService = require('./industriesServices');
const Utils = require('../../util/utilFunctions');

class IndustriesController {

    static async industries(req, res) {
        const data = await IndustriesService.industries(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = IndustriesController;
