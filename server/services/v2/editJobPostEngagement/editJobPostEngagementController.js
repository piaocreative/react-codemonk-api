const EditJobPostEngagementService = require('./editJobPostEngagementService');
const Utils = require('../../../util/utilFunctions');

class EditJobPostEngagementController {

    static async editJobPostEngagement (req, res) {
        try {
            const data = await EditJobPostEngagementService.editJobPostEngagement(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = EditJobPostEngagementController;
