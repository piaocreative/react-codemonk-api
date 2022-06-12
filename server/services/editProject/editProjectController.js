
const EditProjectService = require('./editProjectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client edit project details.
 */
class EditProjectController {

    /**
     * @desc This function is being used to edit client project details
     * @author Innovify
     * @since 12/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async editProject (req, res) {
        try {
            const data = await EditProjectService.editProject(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = EditProjectController;
