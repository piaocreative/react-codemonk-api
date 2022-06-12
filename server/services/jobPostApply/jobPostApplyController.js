
const JobPostApplyService = require('./jobPostApplyService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency add talents
 */
class JobPostApplyController {

    /**
     * @desc This function is being used to apply job post by talent
     * @author Innovify
     * @since 27/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async apply (req, res) {
        try {
            const data = await JobPostApplyService.apply(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('TALENT_APPLIED_JOB_POST'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = JobPostApplyController;
