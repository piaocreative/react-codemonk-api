
const TalentProjectListService = require('./talentProjectListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent project list based on status
 */
class TalentProjectListController {

    /**
     * @desc This function is being used to get talent project list based on status
     * @author Innovify
     * @since 22/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await TalentProjectListService.list(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }

    /**
     * @desc This function is being used to get talent project list based on status
     * @author Innovify
     * @since 22/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async names (req, res) {
        const data = await TalentProjectListService.names(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = TalentProjectListController;
