
const AgencyDeleteTalentsService = require('./agencyDeleteTalentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency add talents
 */
class AgencyDeleteTalentsController {

    /**
     * @desc This function is being used to agency delete talent
     * @author Innovify
     * @since 28/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalent (req, res) {
        try {
            const data = await AgencyDeleteTalentsService.deleteTalent(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyDeleteTalentsController;
