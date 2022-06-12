
const ProjectListService = require('./projectListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for project list based on status
 */
class ProjectListController {

    /**
     * @desc This function is being used to get project list based on status
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await ProjectListService.list(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = ProjectListController;
