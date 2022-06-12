const DashboardService = require('./dashboardService');
const TalentListService = require('./talentListService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for Ambassador dashboard
 */
class DashboardController {

    /**
     * @desc This function is being used to a ambassador invite multiple talents
     * @author CodeMonk
     * @since 01/03/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteTalents(req, res) {
        try {
            const data = await DashboardService.inviteTalents(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('AMBASSADOR_INVITE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to get ambassador's invited talent list
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async getInvitedTalents(req, res) {
        try {
            const data = await TalentListService.getInvitedTalents(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to a ambassador invite multiple talents
     * @author CodeMonk
     * @since 01/03/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
     static async inviteClients(req, res) {
        try {
            const data = await DashboardService.inviteClients(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('AMBASSADOR_INVITE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = DashboardController;
