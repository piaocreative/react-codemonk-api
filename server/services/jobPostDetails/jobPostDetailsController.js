
const JobPostDetailsService = require('./jobPostDetailsService');
const Utils = require('../../util/utilFunctions');
const UserProfileService = require('../userProfile/userProfileService');

/**
 * Class represents controller for job post details based on it's id
 */
class JobPostDetailsController {

    /**
     * @desc This function is being used to get job post details based on it's id
     * @author Innovify
     * @since 26/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await JobPostDetailsService.details(req, res.locals.user, res.__);
            const userData = await UserProfileService.getUserDetails(res.locals.user);
            data.userData = userData;
            
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = JobPostDetailsController;
