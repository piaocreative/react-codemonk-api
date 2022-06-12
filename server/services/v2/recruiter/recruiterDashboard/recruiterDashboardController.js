const RecruiterDashboardService = require('./recruiterDashboardService');
const RecruiterTalentListService = require('./recruiterTalentListService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for Recruiter dashboard
 */
class RecruiterDashboardController {

    /**
     * @desc This function is being used to a recruiter invite multiple talents
     * @author Innovify
     * @since 02/22/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteTalents(req, res) {
        try {
            const data = await RecruiterDashboardService.inviteTalents(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('RECRUITER_INVITE_SUCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to get recruiter's invited talent list
     * @author Innovify
     * @since 02/22/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async getInvitedTalents(req, res) {
        try {
            const data = await RecruiterTalentListService.getInvitedTalents(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = RecruiterDashboardController;
