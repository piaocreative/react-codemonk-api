
const TalentDashboardService = require('./talentDashboardService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent dashboard
 */
class TalentDashboardController {

    /**
     * @desc This function is being used to invite talent friends
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteFriends (req, res) {
        try {
            const data = await TalentDashboardService.inviteFriends(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('TALENT_INVITE_SUCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentDashboardController;
