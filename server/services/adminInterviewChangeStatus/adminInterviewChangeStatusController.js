
const AdminInterviewChangeStatusService = require('./adminInterviewChangeStatusService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin change interview status
 */
class AdminInterviewChangeStatusController {

    /**
     * @desc This function is being used to admin change interview status
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async status (req, res) {
        try {
            const data = await AdminInterviewChangeStatusService.status(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AdminInterviewChangeStatusController;
