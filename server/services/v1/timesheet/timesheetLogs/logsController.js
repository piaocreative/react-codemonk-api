
const LogsService = require('./logsService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for timesheet logs
 */
class LogsController {

    /**
     * @desc This function is being used to get timesheet logs
     * @author CodeMonk
     * @since 03/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async logs (req, res) {
        const data = await LogsService.logs(req);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = LogsController;
