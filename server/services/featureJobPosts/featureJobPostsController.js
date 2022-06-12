
const FeatureJobPostsService = require('./featureJobPostsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent job post
 */
class FeatureJobPostsController {

    /**
     * @desc This function is being used to get feature jobs
     * @author Innovify
     * @since 02/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async featureJobs (req, res) {
        const data = await FeatureJobPostsService.featureJobs(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = FeatureJobPostsController;
