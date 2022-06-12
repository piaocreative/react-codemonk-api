const EditJobPostBasicDetailsService = require('./editJobPostBasicDetailsService');
const Utils = require('../../util/utilFunctions');

class EditJobPostBasicDetailsController {

    static async editJobPostBasicDetails (req, res) {
        try {
            const data = await EditJobPostBasicDetailsService.editJobPostBasicDetails(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = EditJobPostBasicDetailsController;
