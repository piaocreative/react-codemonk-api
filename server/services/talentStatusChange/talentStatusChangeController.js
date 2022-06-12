
const TalentStatusChangeService = require('./talentStatusChangeService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent status change
 */
class TalentStatusChangeController {

    /**
     * @desc This function is being used to talent status change
     * @author Innovify
     * @since 27/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await TalentStatusChangeService.changeStatus(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = TalentStatusChangeController;
