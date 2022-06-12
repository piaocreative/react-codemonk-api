
const JobPostListService = require('./jobPostListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent feature job posts
 */
class JobPostListController {

    /**
     * @desc This function is being used to get talent feature job posts
     * @author Innovify
     * @since 26/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await JobPostListService.list(req, res.locals.user, res.newBrief);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = JobPostListController;
