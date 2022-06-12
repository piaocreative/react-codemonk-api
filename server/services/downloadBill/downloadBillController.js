const DownloadBillService = require('./downloadBill.service');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for timesheet
 */
class DownloadBillController {

    static async downloadBill (req, res) {
        try {
            const data = await DownloadBillService.downloadBill(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('UPDATE_TIMESHEET_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }
}

module.exports = DownloadBillController;
