
const AddProjectService = require('./addProjectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client add project details.
 */
class AddProjectController {

    /**
     * @desc This function is being used to add client project details
     * @author Innovify
     * @since 05/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addProject (req, res) {
        try {
            const data = await AddProjectService.addProject(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddProjectController;
