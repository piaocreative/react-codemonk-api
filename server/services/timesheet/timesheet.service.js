const TimeSheet = require('../../models/timesheet.model');
const timeSheetValidator = require('./timesheet.validator');
const TimesheetHistory = require('../../models/timesheetHistory.model');
const {
    TIMESHEET: { STATUS: { DRAFT, SUBMITTED, ACCEPT, IN_REVIEW, SETTELED } },
    ROLE: { TALENT }
} = require('../../util/constants');
const SendNotification = require('../../util/sendNotification');
const AddBillService = require('../addBill/addBill.service');
/**
 * @name TimeSheetService timesheet service
 */
class TimeSheetService {

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async addTimeSheet (req, user, local) {
        const timesheetObj = JSON.parse(JSON.stringify(req.body));
        if (user.role === TALENT) {
            timesheetObj.talentId = user._id;
        }
        const Validator = new timeSheetValidator(timesheetObj, local);
        timesheetObj.dateStart = Validator.checkDate(timesheetObj.dateStart, 'Date start').toDate();
        const { clientId } = await Validator.validateProject();
        timesheetObj.clientId = clientId;
        timesheetObj.week = Validator.checkWeek();
        timesheetObj.status = Validator.checkStatus([SUBMITTED, DRAFT]);

        timesheetObj.week.forEach((d) => {
            d.hours = d.value * 8;
            d.minutes = 0;
        });
        const result = await TimeSheet.create(timesheetObj);
        req.body.timesheetId = result._id;
        req.body.talentId = result.talentId;
        req.body.clientId = result.clientId;
        req.body.projectId = result.projectId;
        req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_SUBMIT;
        await SendNotification.sendNotification(req, user, local);
        await TimesheetHistory.updateOne({
            clientId
        }, {
            timesheetId: result,
            timesheetPublishedDate: result.updatedAt
        }, {
            upsert: true
        });
        return result;
    }

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async updateTimeSheet (req, user, local) {
        const timesheet = await TimeSheet.findById(req.params.id);
        const Validator = new timeSheetValidator(req.body, local);
        if (timesheet.status !== DRAFT) {
            throw new CodeMonkError(local('EDIT_TIMESHEET_SUBMITTED'), 400);
        }
        timesheet.dateStart = Validator.checkDate(req.body.dateStart, 'Date start').toDate();
        timesheet.week = Validator.checkWeek();
        timesheet.week.forEach((d) => {
            d.hours = d.value * 8;
            d.minutes = 0;
        });
        timesheet.status = Validator.checkStatus([DRAFT, SUBMITTED]);
        return await timesheet.save();
    }

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async updateTimeSheetStatus (req, user, local) {
        const timesheet = await TimeSheet.findById(req.params.id);
        const Validator = new timeSheetValidator(req.body, local);
        if (timesheet.status === DRAFT) {
            throw new CodeMonkError(local('EDIT_TIMESHEET_SUBMITTED'), 400);
        }
        timesheet.status = Validator.checkStatusUpdate(timesheet.status, user.role);
        await this.sendNotification(req, user, local, timesheet);

        if (timesheet.status === ACCEPT) {
            const bills = await AddBillService.addBill(req, user, local);
            if (bills && bills.length > 0) {
                timesheet.billId = bills[0].bill._id;
            }
        }
        timesheet.histories.push({
            status: timesheet.status,
            billId: timesheet.billId,
            createdBy: user._id
        });
        if (timesheet.status === ACCEPT) {
            timesheet.approvedOn = MOMENT();
        }
        await timesheet.save();


    }

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async getTimeSheet (id) {
        return await TimeSheet.findById(id, ['week', 'dateStart', 'projectId']);
    }
    static async sendNotification (req, user, local, timesheet) {
        req.body.timesheetId = timesheet._id;
        req.body.talentId = timesheet.talentId;
        switch (timesheet.status) {
            case ACCEPT:
                req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_APPROVED;
                await SendNotification.sendNotification(req, user, local);
                break;
            case IN_REVIEW:
                req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_INREVIEW;
                await SendNotification.sendNotification(req, user, local);
                break;
            case SETTELED:
                req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_SETTELED;
                await SendNotification.sendNotification(req, user, local);
                break;
            default:
                break;
        }
    }
}

module.exports = TimeSheetService;
