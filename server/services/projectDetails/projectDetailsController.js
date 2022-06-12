
const projectDetailsService = require('./projectDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for project details based on it's id
 */
class ProjectDetailsController {

    /**
     * @desc This function is being used to get project details based on it's id
     * @author Innovify
     * @since 17/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await projectDetailsService.details(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = ProjectDetailsController;
