const EditJobPostPreferredCandidatesService = require('./editJobPostPreferredCandidatesService');
const Utils = require('../../../util/utilFunctions');

class EditJobPostPreferredCandidatesController {

    static async editJobPostPreferredCandidates (req, res) {
        try {
            const data = await EditJobPostPreferredCandidatesService.editJobPostPreferredCandidates(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = EditJobPostPreferredCandidatesController;
