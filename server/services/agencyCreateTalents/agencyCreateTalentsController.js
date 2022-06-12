
const AgencyCreateTalentsService = require('./agencyCreateTalentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency add talents
 */
class AgencyCreateTalentsController {

    /**
     * @desc This function is being used to create/invite agency talent(s) on success onboarding
     * @author Innovify
     * @since 04/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteAgencyTalents (req, res) {
        const data = await AgencyCreateTalentsService.inviteAgencyTalents(res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }

    /**
     * @desc This function is being used to create agency talent(s)
     * @author Innovify
     * @since 04/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async createAgencyTalent (req, res) {
        try {
            const data = await AgencyCreateTalentsService.addAgencyTalent(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('TALENT_ADDED'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyCreateTalentsController;
