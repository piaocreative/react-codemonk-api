
const AlgoServerService = require('./algoServerService');
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

    static async getRecCandidatesFromJobId(req, res) {
        try {
            const data = await AlgoServerService.getRecCandidatesFromJobId(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    static async getRecJobsFromTalentId(req, res) {
        try {
            const data = await AlgoServerService.getRecJobsFromTalentId(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    static async testUrl(req, res) {
        try {
            const data = await AlgoServerService.testUrl(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = AlgoServerController;
