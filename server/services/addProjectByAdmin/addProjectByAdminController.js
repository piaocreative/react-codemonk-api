
const AddProjectByAdminService = require('./addProjectByAdminService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for add project by admin.
 */
class AddProjectByAdminController {

    /**
     * @desc This function is being used to add project details by admin
     * @author Innovify
     * @since 17/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addProjectByAdmin (req, res) {
        try {
            const data = await AddProjectByAdminService.addProjectByAdmin(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('ADMIN_PROJECT_ADD_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddProjectByAdminController;
