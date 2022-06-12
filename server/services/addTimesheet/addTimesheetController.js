const AddTimeSheetService = require('./addTimesheet.service');
const Utils = require('../../util/utilFunctions');
const ListTimeSheet = require('./listTimesheet.service');

/**
 * Class represents controller for timesheet
 */
class AddTimeSheetController {

    /**
     * @desc This function is being used to add timesheet
     * @author Codemonk
     * @since 05/08/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addTimeSheet (req, res) {
        try {
            const data = await AddTimeSheetService.addTimeSheet(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('ADD_TIMESHEET_SUCCESS', data.name));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }

    /**
     * @desc This function is being used to list timesheet
     * @author Codemonk
     * @since 05/08/202
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async listTimeSheet (req, res) {
        const data = await ListTimeSheet
            .listTimeSheet(req, res.locals.user, res.__, res.newTimesheet);
        Utils.sendResponse(null, data, res, res.__('SUCCESS', data.name));
    }

    /**
     * @desc This function is being used to update timesheet
     * @author Codemonk
     * @since 05/08/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateTimeSheet (req, res) {
        try {
            const data = await AddTimeSheetService.updateTimeSheet(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('UPDATE_TIMESHEET_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }

    static async downloadBill (req, res) {
        try {
            const data = await AddTimeSheetService.downloadBill(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('UPDATE_TIMESHEET_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }
}

module.exports = AddTimeSheetController;
