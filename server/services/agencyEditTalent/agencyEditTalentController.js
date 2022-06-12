
const AgencyEditTalentsService = require('./agencyEditTalentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency edit talent
 */
class AgencyEditTalentsController {

    /**
     * @desc This function is being used to agency edit talent
     * @author Innovify
     * @since 28/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalent (req, res) {
        try {
            const data = await AgencyEditTalentsService.editTalent(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencyEditTalentsController;
