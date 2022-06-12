const AddJobPostEngagementService = require('./addJobPostEngagementService');
const Utils = require('../../../util/utilFunctions');

class AddJobPostEngagementController {

    static async addJobPostEngagement (req, res) {
        try {
            const data = await AddJobPostEngagementService.addJobPostEngagement(req, res.locals.user, res.__);
            if (res.locals.user.role === CONSTANTS.ROLE.CLIENT) {
                Utils.sendResponse(null, data, res, res.__('CLIENT_ADD_BRIEF_SUCCESS', data.name));
            } else {
                Utils.sendResponse(null, data, res, res.__('ADD_BRIEF_SUCCESS', data.name));
            }
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddJobPostEngagementController;
