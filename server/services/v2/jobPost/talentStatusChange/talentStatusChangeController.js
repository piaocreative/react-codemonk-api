
const TalentStatusChangeService = require('./talentStatusChangeService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for jobPost status change
 */
class TalentStatusChangeController {

    /**
     * @desc This function is being used to jobPost talent status change
     * @author CodeMonk
     * @since 16/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeTalentStatus (req, res) {
        try {
            const data = await TalentStatusChangeService.changeTalentStatus(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('JOB_POST_TALENT_STATUS_CHANGE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = TalentStatusChangeController;
