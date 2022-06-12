
const TalentStatusAddService = require('./talentStatusAddService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for jobPost status add
 */
class TalentStatusAddController {

    /**
     * @desc This function is being used to add application to a job.
     * @author CodeMonk
     * @since 08/03/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentStatus (req, res) {
        try {
            const data = await TalentStatusAddService.addTalentStatus(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('JOB_POST_TALENT_ADD_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = TalentStatusAddController;
