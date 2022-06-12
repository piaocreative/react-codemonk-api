const TimeSheet = require('../../models/timesheet.model');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const Agency = require('../../models/agency.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const Client = require('../../models/client.model');

const timeSheetValidator = require('./addTimesheet.validator');
const TimesheetHistory = require('../../models/timesheetHistory.model');
const {
    TIMESHEET: { STATUS: { DRAFT, SUBMITTED, ACCEPT, IN_REVIEW } },
    ROLE: { TALENT, ADMIN }
} = require('../../util/constants');
const SendNotification = require('../../util/sendNotification');
const AddBillService = require('../addBill/addBill.service');
const Utils = require('../../util/utilFunctions');

/**
 * @name AddTimeSheetService timesheet service
 */
class AddTimeSheetService {

    /**
     * @desc This function is being used to add admin job post details
     * @author Codemonk
     * @since 05/08/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async addTimeSheet (req, user, local) {
        let timesheetObj = JSON.parse(JSON.stringify(req.body));
        if (user.role === TALENT) {
            timesheetObj.talentId = user._id;
        }
        const Validator = new timeSheetValidator(timesheetObj, local);
        timesheetObj.dateStart = Validator.checkDate(timesheetObj.dateStart, 'Date start').toDate();
        const { clientId } = await Validator.validateProject();
        timesheetObj.clientId = clientId;
        timesheetObj.week = Validator.checkWeek();
        timesheetObj.status = Validator.checkStatus([SUBMITTED, DRAFT]);

        timesheetObj = await AddTimeSheetService.calculateBilling(timesheetObj);
        timesheetObj.createdBy = user._id;
        timesheetObj.histories = [timesheetObj];
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
        let timesheet = await TimeSheet.findById(req.params.id);
        const Validator = new timeSheetValidator(req.body, local);

        if (user.role === ADMIN) {
            if (![DRAFT, ACCEPT, IN_REVIEW, SUBMITTED].includes(parseInt(timesheet.status))) {
                throw new CodeMonkError(local('EDIT_TIMESHEET_SUBMITTED'), 400);
            }
        } else if (timesheet.status !== DRAFT) {
            throw new CodeMonkError(local('EDIT_TIMESHEET_SUBMITTED'), 400);
        }

        timesheet.dateStart = Validator.checkDate(req.body.dateStart, 'Date start').toDate();
        timesheet.week = Validator.checkWeek();
        if (user.role === ADMIN) {
            timesheet.status = Validator.checkStatus([DRAFT, ACCEPT, IN_REVIEW, SUBMITTED]);
        } else {
            timesheet.status = Validator.checkStatus([DRAFT, SUBMITTED]);
        }
        timesheet = await AddTimeSheetService.calculateBilling(timesheet);
        timesheet.histories.push({
            dateStart: timesheet.dateStart,
            week: timesheet.week,
            status: timesheet.status,
            billId: timesheet.billId,
            earning: timesheet.earning,
            commission: timesheet.commission,
            cost: timesheet.cost,
            talentVat: timesheet.talentVat,
            clientVat: timesheet.clientVat,
            currency: timesheet.currency,
            ratePerHour: timesheet.ratePerHour,
            ratePerDay: timesheet.ratePerDay,
            createdBy: user._id
        });

        if (timesheet.status === ACCEPT) {
            timesheet.approvedOn = MOMENT();
        }
        const updatedTimeSheet = await timesheet.save();
        if (user.role === ADMIN) {
            await AddTimeSheetService.updateTimeSheetAndGenerateTheBill(timesheet._id, user);
        }
        return updatedTimeSheet;
    }

    static async downloadBill (req, user, local) {
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

    static async calculateBilling (timesheetObj) {
        const talent = await Talent.findOne(
            { userId: timesheetObj.talentId },
            { billing: 1, currency: 1, ratePerHour: 1, ratePerDay: 1, registerType: 1 }
        ).lean();
        timesheetObj.currency = talent.currency;
        timesheetObj.ratePerHour = talent.ratePerHour;
        timesheetObj.ratePerDay = talent.ratePerDay;
        const talentUser = await User.findOne({ _id: timesheetObj.talentId }, { email: 1, billing: 1 }).lean();
        let subTotal = 0;
        for (const w of timesheetObj.week) {
            const hours = parseInt(w.hours, 10);
            const minutes = parseInt(w.minutes, 10);
            if (hours > 0 || minutes > 0) {
                if ((hours + (minutes / 60)) < CONSTANTS.TIMESHEET.DAY.HOURS) {
                    // hours
                    subTotal += (hours + (minutes / 60)) * timesheetObj.ratePerHour;
                } else {
                    // day
                    subTotal += timesheetObj.ratePerDay;
                }
            }
        }
        timesheetObj.earning = Utils.round(subTotal, 2);

        const agencyTalent = await AgencyTalent.findOne({ 'talents.email': talentUser.email }, { agencyId: 1 }).lean();

        if (agencyTalent && agencyTalent.agencyId) {
            const agency = await Agency.findOne({ userId: agencyTalent.agencyId }, { agency: 1 }).lean();
            if (CONSTANTS.TALENT_REGISTER_TYPE.AGENCY === talent.registerType
                 && CONSTANTS.VAT.COUNTRY === agency.agency.country
                  && agency.agency.vatNumber && agency.agency.vatNumber.length > 0) {
                timesheetObj.talentVat = Utils.round(subTotal * CONSTANTS.VAT.PERCENTAGE / 100, 2);
            }
        } else if (CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER === talent.registerType
            && talent.billing && talent.billing.type
            && CONSTANTS.BILLING_TYPES_COMPANY === talent.billing.type
            && CONSTANTS.VAT.COUNTRY === talent.billing.companyDetails.country
            && talent.billing.companyDetails.vatNumber
            && talent.billing.companyDetails.vatNumber.length > 0) {
            timesheetObj.talentVat = Utils.round(subTotal * CONSTANTS.VAT.PERCENTAGE / 100, 2);
        } else {
            timesheetObj.talentVat = 0;
        }

        timesheetObj.commission = Utils.round(subTotal * (CONSTANTS.RATE_MULTIPLIER - 1), 2);
        const client = await Client.findOne({ userId: timesheetObj.clientId }, { billing: 1 }).lean();
        if (client.billing && client.billing.type
            && CONSTANTS.CLIENT_TYPES_COMPANY === client.billing.type
            && CONSTANTS.VAT.COUNTRY === client.billing.companyDetails.country
            && client.billing.companyDetails.vatNumber
            && client.billing.companyDetails.vatNumber.length > 0) {
            timesheetObj.clientVat = Utils.round(subTotal * (CONSTANTS.RATE_MULTIPLIER - 1) * CONSTANTS.VAT.PERCENTAGE / 100, 2);
        } else {
            timesheetObj.clientVat = 0;
        }
        timesheetObj.cost = Utils.round(timesheetObj.earning + timesheetObj.commission, 2);

        return timesheetObj;
    }

    static async updateTimeSheetStatusAndGenerateTheBill (id) {
        const timesheet = await TimeSheet.findById(id);
        if (timesheet.status === SUBMITTED) {
            timesheet.status = ACCEPT;
            if (timesheet.status === ACCEPT) {
                const bills = await AddBillService.addBillByTimesheetId(timesheet._id);
                if (bills && bills.length > 0) {
                    timesheet.billId = bills[0].bill._id;
                }
            }
            timesheet.histories.push({
                status: timesheet.status,
                billId: timesheet.billId
            });
            await timesheet.save();
        }
    }

    static async updateTimeSheetAndGenerateTheBill (id, user) {
        const timesheet = await TimeSheet.findById(id);
        if (timesheet.status === ACCEPT) {
            const bills = await AddBillService.addBillByTimesheetId(timesheet._id);
            if (bills && bills.length > 0) {
                timesheet.billId = bills[0].bill._id;
                timesheet.histories.push({
                    billId: timesheet.billId,
                    createdBy: user._id
                });
                await timesheet.save();
            }
        }
    }
}

module.exports = AddTimeSheetService;
