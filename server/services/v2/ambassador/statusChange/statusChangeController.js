
const StatusChangeService = require('./statusChangeService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for recruiter status change
 */
class StatusChangeController {

    /**
     * @desc This function is being used to ambassador status change
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changeStatus (req, res) {
        try {
            const data = await StatusChangeService.changeStatus(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = StatusChangeController;
