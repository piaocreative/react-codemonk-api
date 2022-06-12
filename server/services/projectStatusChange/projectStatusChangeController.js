
const ProjectStatusChangeService = require('./projectStatusChangeService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for project status change
 */
class ProjectStatusChangeController {

    /**
     * @desc This function is being used to project status change
     * @author Innovify
     * @since 21/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await ProjectStatusChangeService.changeStatus(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ProjectStatusChangeController;
