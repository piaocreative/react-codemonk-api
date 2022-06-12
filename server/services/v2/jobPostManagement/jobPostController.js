const JobPostService = require('./jobPostService');
const Utils = require('../../../util/utilFunctions');

class JobPostController {
    static async addJobPost (req, res) {
        try {
            const data = await JobPostService.addJobPost(req, res.locals.user, res.__);
            if (res.locals.user.role === CONSTANTS.ROLE.CLIENT) {
                Utils.sendResponse(null, data, res, res.__('CLIENT_ADD_BRIEF_SUCCESS', data.name));
            } else {
                Utils.sendResponse(null, data, res, res.__('ADD_BRIEF_SUCCESS', data.name));
            }
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async updateJobPostRole (req, res) {
        try {
            const data = await JobPostService.updateJobPost(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = JobPostController;
