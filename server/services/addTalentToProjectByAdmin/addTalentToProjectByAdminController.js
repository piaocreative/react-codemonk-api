
const AddTalentToProjectByAdminService = require('./addTalentToProjectByAdminService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for add talent to a project by admin
 */
class AddTalentToProjectByAdminController {

    /**
     * @desc This function is being used to add talent to a project by admin
     * @author Innovify
     * @since 17/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addTalentToProjectByAdmin (req, res) {
        try {
            const data = await AddTalentToProjectByAdminService.addTalentToProjectByAdmin(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddTalentToProjectByAdminController;
