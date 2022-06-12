
const TalentSearchService = require('./talentSearchService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent search with filter/s
 */
class TalentSearchController {

    /**
     * @desc This function is being used to search talent based on filter/s
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async search(req, res) {
        try {
            const data = await TalentSearchService.search(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentSearchController;
