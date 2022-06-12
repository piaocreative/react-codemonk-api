
const CertificationsService = require('./certificationsServices');
const Utils = require('../../util/utilFunctions');

class CertificationsController {

    static async certifications(req, res) {
        const data = await CertificationsService.certifications(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = CertificationsController;
