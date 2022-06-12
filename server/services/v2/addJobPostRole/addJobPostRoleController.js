const AddJobPostRoleService = require('./addJobPostRoleService');
const Utils = require('../../../util/utilFunctions');

class AddJobPostRoleController {

    static async addJobPostRole (req, res) {
        try {
            const data = await AddJobPostRoleService.addJobPostRole(req, res.locals.user, res.__);
            CONSOLE_LOGGER.info('Job POST Role ', data.body);

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

module.exports = AddJobPostRoleController;
