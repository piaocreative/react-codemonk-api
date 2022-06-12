const EditJobPostRoleService = require('./editJobPostRoleService');
const Utils = require('../../../util/utilFunctions');

class EditJobPostRoleController {

    static async editJobPostRole (req, res) {
        try {
            const data = await EditJobPostRoleService.editJobPostRole(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = EditJobPostRoleController;
