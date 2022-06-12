
const AdminInterviewChangeTalentStatusService = require('./adminInterviewChangeTalentStatusService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin change interview status of talent
 */
class AdminInterviewChangeTalentStatusController {

    /**
     * @desc This function is being used to admin change interview status of talent
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async talentStatus (req, res) {
        try {
            const data = await AdminInterviewChangeTalentStatusService.talentStatus(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AdminInterviewChangeTalentStatusController;
