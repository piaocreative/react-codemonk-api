const TimeSheet = require('../../models/timesheet.model');
const Utils = require('../../util/utilFunctions');
const AddTimeSheetService = require('../addTimesheet/addTimesheet.service');
const {
    TIMESHEET: {
        STATUS: { SUBMITTED } }
} = require('../../util/constants');

module.exports = async function () {
    try {
        if (!process.env.PM2_JSON_PROCESSING || parseInt(process.env[process.env.instance_var], 10) === 0) {
            const count = await TimeSheet.count({ dateStart: Utils.previousWeekStarting().toDate(), status: SUBMITTED })
            const limit = 50;
            const itr = count / (limit * 1.0);
            console.log(`Total ${count} timesheet(s) submitted by last week.`)
            for (let i = 0; i < itr; i++) {
                const timesheets = await TimeSheet.find({ dateStart: Utils.previousWeekStarting().toDate(), status: SUBMITTED }).select('_id').limit(limit).lean();
                if (timesheets && timesheets.length > 0) {
                    for (let j = 0; j < timesheets.length; j++) {
                        if (timesheets[j] && timesheets[j]._id) {
                            await AddTimeSheetService.updateTimeSheetStatusAndGenerateTheBill(timesheets[j]._id)
                        }
                    }
                }
            }
        }
    } catch (error) {
        CONSOLE_LOGGER.error(error);
    }
};
