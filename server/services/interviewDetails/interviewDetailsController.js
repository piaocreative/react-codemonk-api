
const InterviewDetailsService = require('./interviewDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for interview details with id
 */
class InterviewDetailsController {

    /**
     * @desc This function is being used to interview details with id
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        const data = await InterviewDetailsService.details(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = InterviewDetailsController;
