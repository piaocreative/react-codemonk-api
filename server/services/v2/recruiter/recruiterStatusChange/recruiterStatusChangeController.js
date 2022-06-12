
const RecruiterStatusChangeService = require('./recruiterStatusChangeService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for recruiter status change
 */
class RecruiterStatusChangeController {

    /**
     * @desc This function is being used to recruiter status change
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await RecruiterStatusChangeService.changeStatus(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = RecruiterStatusChangeController;
