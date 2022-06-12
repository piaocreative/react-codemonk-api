
const JobPostDetailsService = require('./jobPostDetailsService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for job post details based on it's id
 */
class JobPostDetailsController {

    /**
     * @desc This function is being used to get job post details based on it's id
     * @author CodeMonk
     * @since 14/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await JobPostDetailsService.details(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = JobPostDetailsController;
