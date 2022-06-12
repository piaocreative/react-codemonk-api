
const TalentStatusChangeForProjectService = require('./talentStatusChangeForProjectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for project status change
 */
class TalentStatusChangeForProjectController {

    /**
     * @desc This function is being used to project talent status change
     * @author Innovify
     * @since 21/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeTalentStatus (req, res) {
        try {
            const data = await TalentStatusChangeForProjectService.changeTalentStatus(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = TalentStatusChangeForProjectController;
