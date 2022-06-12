const TimeSheet = require('../../../models/timesheet.model');
const Bill = require('../../../models/bill.model');
const AutoGeneratorService = require('../../autoGenerator/autoGeneratorService')
const {
    TIMESHEET: { STATUS: { DRAFT, SUBMITTED, ACCEPT, IN_REVIEW, SETTELED } },
    ROLE: { TALENT }
} = require('../../../util/constants');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const mongoose = require('mongoose');
const UploadService = require('../../../util/uploadService');
const currency = require('../../../util/currency');
const Utils = require('../../../util/utilFunctions');


/**
 * @name AddBillService timesheet service
 */
class AddBillService {


    static async addBill(req, user, local) {
        const timesheetId = req.params.id;
        const bills = await AddBillService.addBillByTimesheetId(timesheetId);
        return bills
    }

    static async addBillByTimesheetId(timesheetId) {
        const bills = await TimeSheet.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(timesheetId) }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { talentId: '$talentId' },
                    pipeline: [
                        { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                        {
                            $project: {
                                talentUserId: '$_id',
                                profilePicture: 1,
                                firstName: 1,
                                lastName: 1,
                                isDelete: 1,
                                email: 1,
                                name: { $concat: ['$firstName', ' ', '$lastName'] }
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'talents',
                    let: { talentId: '$talentId' },
                    pipeline: [
                        { $match: { '$expr': { '$eq': ['$userId', '$$talentId'] } } },
                        {
                            $project: {
                                ratePerHour: 1,
                                ratePerDay: 1,
                                currency: 1,
                                registerType: 1,
                                addressLineOne: 1,
                                addressLineTwo: 1,
                                city: 1,
                                country: 1,
                                postCode: 1,
                                billing: 1,
                                pay: 1
                            }
                        }
                    ],
                    as: 'talent'
                }
            },
            {
                $lookup: {
                    from: 'agencytalents',
                    let: { emailId: { $arrayElemAt: ["$user.email", 0] } },
                    pipeline: [
                        { "$match": { "$expr": { "$in": ["$$emailId", "$talents.email"] } } },
                        {
                            $project: {
                                agencyId: 1,
                                talents: 1,
                                talentEmails: {
                                    $map: {
                                        input: '$talents',
                                        as: 't',
                                        in: '$$t.email'
                                    }
                                }
                            }
                        }
                    ],
                    as: 'agencytalent'
                }
            },
            {
                $lookup: {
                    from: 'agencies',
                    let: { agencyId: { $arrayElemAt: ["$agencytalent.agencyId", 0] } },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$$agencyId", "$userId"] } } },
                        {
                            $project: {
                                agency: 1,
                                payDetails: 1,
                                trading: 1
                            }
                        }
                    ],
                    as: 'agency'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { agencyId: { $arrayElemAt: ["$agencytalent.agencyId", 0] } },
                    pipeline: [
                        { $match: { '$expr': { '$eq': ['$_id', '$$agencyId'] } } },
                        {
                            $project: {
                                talentUserId: '$_id',
                                profilePicture: 1,
                                firstName: 1,
                                lastName: 1,
                                isDelete: 1,
                                email: 1,
                                name: { $concat: ['$firstName', ' ', '$lastName'] }
                            }
                        }
                    ],
                    as: 'agencyuser'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    let: { projectId: "$projectId" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$$projectId", "$_id"] } } },
                        {
                            $project: {
                                name: 1
                            }
                        }
                    ],
                    as: 'project'
                }
            },
            {
                $project: {
                    agency: { $arrayElemAt: ["$agency", 0] },
                    project: { $arrayElemAt: ["$project", 0] },
                    talent: { $arrayElemAt: ["$talent", 0] },
                    user: { $arrayElemAt: ["$user", 0] },
                    agencyuser: { $arrayElemAt: ["$agencyuser", 0] },
                    dateStart: 1,
                    week: {
                        $map: {
                            input: {
                                $filter: {
                                    input: '$week',
                                    as: "w",
                                    cond: { $or: [{ $gt: ["$$w.hours", 0] }, { $gt: ["$$w.minutes", 0] }] }
                                }
                            },
                            as: 'w',
                            in: {
                                "date": "$$w.date",
                                "hours": "$$w.hours",
                                "minutes": "$$w.minutes",
                                "dayOfWeek": {
                                    $switch: {
                                        branches: [
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 1, 'Sunday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 2, 'Monday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 3, 'Tuesday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 4, 'Wednesday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 5, 'Thursday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 6, 'Friday'),
                                            AddBillService.dayOfWeek({ "$dayOfWeek": "$$w.date" }, 7, 'Saturday')
                                        ],
                                        default: 'Monday'
                                    }
                                },
                                "day": { $cond: [{ $gte: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, 1, 0] },
                                "hours": { $cond: [{ $lt: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, '$$w.hours', 0] },
                                "minutes": { $cond: [{ $lt: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, '$$w.minutes', 0] },
                                "rate": { $cond: [{ $lt: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, { $arrayElemAt: ["$talent.ratePerHour", 0] }, { $arrayElemAt: ["$talent.ratePerDay", 0] }] },
                                "amount": AddBillService.calculateAmountPerDayPerWeek(),
                                "vat": {
                                    $cond: [
                                        AddBillService.applyVATCondition(),
                                        CONSTANTS.VAT.PERCENTAGE,
                                        0
                                    ]
                                },
                                "vatAmount": {
                                    $cond: [
                                        AddBillService.applyVATCondition(),
                                        this.mongoRoundTwoDecimal({ $divide: [{ $multiply: [CONSTANTS.VAT.PERCENTAGE, AddBillService.calculateAmountPerDayPerWeek()] }, 100] }),
                                        0
                                    ]
                                }
                            }
                        }
                    },
                    "vatNumber": {
                        $cond: [
                            { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] },
                            { $arrayElemAt: ["$agency.agency.vatNumber", 0] },
                            { $arrayElemAt: ["$talent.billing.companyDetails.vatNumber", 0] }
                        ]
                    },
                    name: AddBillService.nameProjection(),
                    companyName: AddBillService.companyNameProjection(),
                    address: AddBillService.addressProjection(),
                    bankName: AddBillService.paymentToProjection(CONSTANTS.PAYOUT_TYPES_BANK, { $arrayElemAt: ["$agency.payDetails.bankName", 0] }, { $arrayElemAt: ["$talent.pay.bankDetails.name", 0] }),
                    bankAccount: AddBillService.paymentToProjection(CONSTANTS.PAYOUT_TYPES_BANK, { $arrayElemAt: ["$agency.payDetails.accNumber", 0] }, { $arrayElemAt: ["$talent.pay.bankDetails.accNumber", 0] }),
                    bankCode: AddBillService.paymentToProjection(CONSTANTS.PAYOUT_TYPES_BANK, { $arrayElemAt: ["$agency.payDetails.bankCode", 0] }, { $arrayElemAt: ["$talent.pay.bankDetails.bankCode", 0] }),
                    paypalId: AddBillService.paymentToProjection(CONSTANTS.PAYOUT_TYPES_PAYPAL, '', { $arrayElemAt: ["$talent.pay.payPalEmail", 0] })
                }
            },
            {
                $project: {
                    agency: 1,
                    agencyuser: 1,
                    project: 1,
                    talent: 1,
                    user: 1,
                    dateStart: 1,
                    week: 1,
                    "vatNumber": 1,
                    billSummary: {
                        $reduce: {
                            input: '$week',
                            initialValue: { subTotal: 0, totalVat: 0, total: 0 },
                            in: {
                                subTotal: this.mongoRoundTwoDecimal({ $add: ['$$this.amount', "$$value.subTotal"] }),
                                totalVat: this.mongoRoundTwoDecimal({ $add: ['$$this.vatAmount', "$$value.totalVat"] }),
                                total: this.mongoRoundTwoDecimal({ $add: ['$$this.amount', '$$this.vatAmount', "$$value.total"] })
                            }
                        }
                    },
                    bankName: 1,
                    bankAccount: 1,
                    bankCode: 1,
                    paypalId: 1,
                    stripeId: '',
                    transferWiseId: '',
                    payoneerId: '',
                    companyName: 1,
                    name: 1,
                    address: 1
                }
            }
        ]);
        for (const b of bills) {
            if (b && b.week && b.week.length > 0) {
                b.week.forEach((w) => {
                    w.projectName = '';
                    w.talentName = '';
                });
                b.week[0].projectName = b.project.name;
                if (b.talent.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
                    b.week[0].talentName = b.user.name;
                }
            }
            b.billNumber = await AutoGeneratorService.nextAutoGenerateNumber('bill');
            const invoice = await this.prepareInvoiceObj(b);
            const htmlContent = await AddBillService.prepareHtml(invoice);
            let pdfName = '';
            if (b.talent.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
                pdfName += `${b.agencyuser._id}/`;
            }
            pdfName += `${b.user._id}/${b.project._id}/${b.billNumber}`;
            b.pdf = await AddBillService.generatePdf(htmlContent, pdfName);
            const bill = await this.prepareBillObj(b);
            b.bill = await Bill.create(bill);
        }
        return bills;
    }

    static calculateAmountPerDayPerWeek() {
        return {
            $cond: [{ $lt: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, this.mongoRoundTwoDecimal({
                $multiply: [{
                    $add: [
                        '$$w.hours',
                        {
                            $divide: ["$$w.minutes", 60]
                        }
                    ]
                }, { $arrayElemAt: ["$talent.ratePerHour", 0] }]
            }), { $arrayElemAt: ["$talent.ratePerDay", 0] }]
        };
    }

    static applyVATCondition() {
        return {
            $or: [
                {
                    $and: [
                        { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] },
                        { $eq: [CONSTANTS.VAT.COUNTRY, { $arrayElemAt: ["$agency.agency.country", 0] }] },
                        { $cond: [{ $gt: [{ $strLenCP: { $arrayElemAt: ["$agency.agency.vatNumber", 0] } }, 0] }, true, false] }
                    ]
                },
                {
                    $and: [
                        { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER, { $arrayElemAt: ["$talent.registerType", 0] }] },
                        { $eq: [CONSTANTS.BILLING_TYPES_COMPANY, { $arrayElemAt: ["$talent.billing.type", 0] }] },
                        { $eq: [CONSTANTS.VAT.COUNTRY, { $arrayElemAt: ["$talent.billing.companyDetails.country", 0] }] },
                        { $cond: [{ $gt: [{ $strLenCP: { $arrayElemAt: ["$talent.billing.companyDetails.vatNumber", 0] } }, 0] }, true, false] }
                    ]
                }
            ]
        };
    }

    static companyNameProjection() {
        return {
            $switch:
            {
                branches: [
                    {
                        case: {
                            $and: [
                                { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER, { $arrayElemAt: ["$talent.registerType", 0] }] },
                                { $eq: [CONSTANTS.BILLING_TYPES_COMPANY, { $arrayElemAt: ["$talent.billing.type", 0] }] }
                            ]
                        },
                        then: { $arrayElemAt: ["$talent.billing.companyDetails.name", 0] }
                    },
                    {
                        case: {
                            $and: [
                                { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] }                            ]
                        },
                        then: { $arrayElemAt: ["$agency.agency.name", 0] }
                    }
                ],
                default: ''
            }
        }
    }

    static paymentToProjection(mappingType, agencyValue, talentValue) {
        return {
            $switch:
            {
                branches: [
                    AddBillService.agencyPaymentTo(mappingType, agencyValue),
                    AddBillService.talentPaymentTo(mappingType, talentValue)
                ],
                default: ''
            }
        }
    }

    static agencyPaymentTo(mappingType, agencyValue) {
        return {
            case: {
                $and: [
                    { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] },
                    { $eq: [CONSTANTS.PAYOUT_TYPES_BANK, mappingType] }
                ]
            },
            then: agencyValue
        };
    }

    static talentPaymentTo(mappingType, talentValue) {
        return {
            case: {
                $and: [
                    { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER, { $arrayElemAt: ["$talent.registerType", 0] }] },
                    { $eq: [mappingType, { $arrayElemAt: ["$talent.pay.type", 0] }] }
                ]
            },
            then: talentValue
        };
    }

    static addressProjection() {
        return {
            $switch:
            {
                branches: [
                    AddBillService.agencyAddress(),
                    AddBillService.companyAddress()
                ],
                default: AddBillService.talentAddress()
            }
        }
    }

    static nameProjection() {
        return {
            $cond: [{ $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] },
            { $arrayElemAt: ["$agencyuser.name", 0] },
            { $arrayElemAt: ["$user.name", 0] }
            ]
        }
    }

    static mongoRoundTwoDecimal(number) {
        const round = {
            $divide: [
                {
                    $subtract: [
                        { $multiply: [number, 100] },
                        { $mod: [{ $multiply: [number, 100] }, 1] }
                    ]
                },
                100]
        }
        return round;
    }

    static dayOfWeek(value, day, result) {
        return {
            case: { $eq: [value, day] },
            then: result
        };
    }

    static agencyAddress() {
        return {
            case: { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.AGENCY, { $arrayElemAt: ["$talent.registerType", 0] }] },
            then: {
                'addressLineOne': { $arrayElemAt: ["$agency.agency.addressLineOne", 0] },
                'addressLineTwo': { $arrayElemAt: ["$agency.agency.addressLineTwo", 0] },
                'city': { $arrayElemAt: ["$agency.agency.city", 0] },
                'country': { $arrayElemAt: ["$agency.agency.country", 0] },
                'postcode': { $arrayElemAt: ["$agency.agency.postcode", 0] }
            }
        };
    }

    static companyAddress() {
        return {
            case: {
                $and: [
                    { $eq: [CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER, { $arrayElemAt: ["$talent.registerType", 0] }] },
                    { $eq: [CONSTANTS.BILLING_TYPES_COMPANY, { $arrayElemAt: ["$talent.billing.type", 0] }] }
                ]
            },
            then: {
                'addressLineOne': { $arrayElemAt: ["$talent.billing.companyDetails.addressLineOne", 0] },
                'addressLineTwo': { $arrayElemAt: ["$talent.billing.companyDetails.addressLineTwo", 0] },
                'city': { $arrayElemAt: ["$talent.billing.companyDetails.city", 0] },
                'country': { $arrayElemAt: ["$talent.billing.companyDetails.country", 0] },
                'postcode': { $arrayElemAt: ["$talent.billing.companyDetails.postcode", 0] }
            }
        };
    }

    static talentAddress() {
        return {
            'addressLineOne': { $arrayElemAt: ["$talent.addressLineOne", 0] },
            'addressLineTwo': { $arrayElemAt: ["$talent.addressLineTwo", 0] },
            'city': { $arrayElemAt: ["$talent.city", 0] },
            'country': { $arrayElemAt: ["$talent.country", 0] },
            'postcode': { $arrayElemAt: ["$talent.postcode", 0] }
        };
    }

    static mapWeek(key, value, htmlContent) {
        let content = '';
        content += `<tbody>`
        value.map(arrValue => {
            content += `
                <tr>
                    <td>${arrValue.talentName}</td>
                    <td>${arrValue.projectName}</td>
                    <td>${arrValue.dayOfWeek}</td>
                    <td>${arrValue.day}</td>
                    <td>${arrValue.hours}</td>
                    <td>${arrValue.minutes}</td>
                    <td>${arrValue.rate}</td>
                    <td>${arrValue.vat}%</td>
                    <td>${arrValue.amount}</td>
                </tr>
            `;
        });
        content += ` </tbody>`
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }

    static async prepareInvoiceObj(bill) {
        const billDate = new Date()
        for (const w of bill.week) {
            w.amount = await AddBillService.amountNumberFormat(w.amount)
            w.rate = await AddBillService.amountNumberFormat(w.rate)
            if (!w.day) {
                w.day = ''
            }

            if (!w.hours) {
                w.hours = ''
            }

            if (!w.minutes) {
                w.minutes = ''
            }
        }
        let logoImage = ''
        if(bill.talent.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY){
            logoImage = `${bill.agency.trading.logo}`
        }
        return {
            billDate: MOMENT(billDate).format("Do MMM YYYY"),
            billNumber: bill.billNumber ? bill.billNumber : '',
            weekStarting: MOMENT(bill.dateStart).format("Do MMM YYYY"),
            name: bill.name,
            address: await AddBillService.appendAddress(bill.address, '<br />'),
            vatNumber: bill.vatNumber ? bill.vatNumber:'',
            vatTitle:bill.vatNumber ? 'VAT/GST/Sales Tax Number:':'',
            timesheet: bill.week,
            subTotal: await AddBillService.amountNumberFormat(bill.billSummary.subTotal),
            totalVat: await AddBillService.amountNumberFormat(bill.billSummary.totalVat),
            totalAmount: await AddBillService.amountNumberFormat(bill.billSummary.total),
            projectName: bill.project.name,
            bankName: this.combineTitleAndValue('Bank Name', bill.bankName),
            bankAccount: this.combineTitleAndValue('Account / IBAN No', bill.bankAccount),
            bankCode: this.combineTitleAndValue('SWIFT / IFSC / Routing / SC', bill.bankCode),
            paypalId: this.combineTitleAndValue('PayPal', bill.paypalId),
            stripeId: this.combineTitleAndValue('Stripe', bill.stripeId),
            transferWiseId: this.combineTitleAndValue('TransferWise', bill.transferWiseId),
            payoneerId: this.combineTitleAndValue('Payoneer', bill.payoneerId),
            currency: bill.talent.currency,
            companyName: this.applyStrongDiv(bill.companyName),
            showDeveloperTitle: this.showDeveloperTitle(bill.talent.registerType), 
            logoImage : logoImage
        }
    }

    static async amountNumberFormat(value) {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
    }

    static async appendAddress(address, appender) {
        let addressString = '';
        if (!address) {
            return addressString;
        }

        if (address.addressLineOne) {
            addressString += address.addressLineOne
        }

        if (address.addressLineTwo) {
            if (addressString.length > 0) {
                addressString += appender
            }
            addressString += address.addressLineTwo
        }

        if (address.city) {
            if (addressString.length > 0) {
                addressString += appender
            }
            addressString += address.city
        }

        if (address.country) {
            if (addressString.length > 0) {
                addressString += appender
            }
            addressString += address.country
        }

        if (address.postcode) {
            if (addressString.length > 0) {
                addressString += appender
            }
            addressString += address.postcode
        }
        return addressString;
    }

    static showDeveloperTitle(value) {
        if (value === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            return 'Developer';
        }
        return '';
    }
    static applyStrongDiv(value) {
        if (!value) {
            return ''
        }
        return `<strong>${value}</strong>`;
    }
    static combineTitleAndValue(title, value) {
        if (!value) {
            return ''
        }
        return `${title}: ${value}`;
    }

    static async prepareBillObj(bill) {
        const billDate = new Date()
        return {
            billDate: billDate,
            billNumber: bill.billNumber,
            weekStarting: bill.dateStart,
            name: bill.name,
            address: await AddBillService.appendAddress(bill.address, '\n'),
            vatNumber: bill.vatNumber ? bill.vatNumber : '',
            timesheet: bill.week,
            subTotal: bill.billSummary.subTotal,
            totalVat: bill.billSummary.totalVat,
            totalAmount: bill.billSummary.total,
            projectName: bill.project.name,
            bankName: bill.bankName,
            bankAccount: bill.bankAccount,
            bankCode: bill.bankCode,
            paypalId: bill.paypalId,
            stripeId: bill.stripeId,
            transferWiseId: bill.transferWiseId,
            payoneerId: bill.payoneerId,
            currency: bill.talent.currency,
            filePath: bill.pdf.pdfName,
            companyName: bill.companyName
        }
    }

    static async prepareHtml(timesheet) {
        let htmlContent = await readFileAsync('htmlTemplates/pdf/bill.html', 'utf8');
        htmlContent = htmlContent.replace(new RegExp('##BASE_URL', 'g'), process.env.BASE_URL);
        for (const [key, value] of Object.entries(timesheet)) {
            if (typeof value === 'object') {
                switch (key) {
                    case 'timesheet':
                        htmlContent = this.mapWeek(key, value, htmlContent);
                        break;
                    default:
                        break;
                }
            } else if (key === 'currency') {
                let currencyValue = '$';
                currency.forEach((cur) => {
                    if (cur.value === value) {
                        currencyValue = cur.symbol;
                    }
                });
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), currencyValue);
            } else if (key === 'ratePerHour') {
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value ? value : 0);
            } else {
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }
        }
        return htmlContent;
    }

    static async generatePdf(htmlContent, id) {
        var options = {
            format: "A4",
            orientation: "portrait",
            footer: {
                contents: {
                    default: `
                    <div style="font-size: 9px; width: 100%;">
                        <div style='padding-right:97px;float: right;float: right;font-size: 9px;color: #2A2536;'>
                        <span>Page <span class="pageNumber">{{page}}</span> of <span class="totalPages">{{pages}}</span></div>
                        <div style='padding-left:97px;color:gray;font-size: 9px;color: rgba(42, 37, 54, 0.5);'>
                            <span>www.codemonk.ai</span>
                        </div>
                    </div>
                `
                }
            }
        };

        const buffer = await Utils.createPDF(htmlContent, options);

        const pdfName = `${process.env.NODE_ENV}-bills/${id}.pdf`;

        const pdfPath = await UploadService.uploadPdf(buffer, pdfName);
        // console message when conversion is complete!
        return {
            pdfName,
            pdfPath
        };
    }
}

module.exports = AddBillService;
