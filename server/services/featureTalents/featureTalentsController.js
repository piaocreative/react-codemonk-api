
const FeatureTalentsService = require('./featureTalentsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for feature talents
 */
class FeatureTalentsController {

    /**
     * @desc This function is being used to get feature talents
     * @author Innovify
     * @since 02/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async featureTalents (req, res) {
        const data = await FeatureTalentsService.featureTalents(req, res.locals.user, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = FeatureTalentsController;
