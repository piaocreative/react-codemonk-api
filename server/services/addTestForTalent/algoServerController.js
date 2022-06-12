
const AlgoServerService = require('./addTestForTalent');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency upload multiple talents
 */
class AlgoServerController {

    static async getSkillsByTalentId(req, res) {
        try {
            const data = await AlgoServerService.getSkillsByTalentId(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    static async getRecommandedCandidatesFromJobRole(req, res) {
        try {
            const data = await AlgoServerService.getRecommandedCandidatesFromJobRole(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AlgoServerController;
