const TimeSheet = require('../../models/timesheet.model');
const timeSheetValidator = require('./downloadBill.validator');
const {
    TIMESHEET: { STATUS: { DRAFT, SUBMITTED, ACCEPT, IN_REVIEW, SETTELED } },
    ROLE: { TALENT }
} = require('../../util/constants');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const mongoose = require('mongoose');
const UploadService = require('../../util/uploadService');
const currency = require('../../util/currency');
const Utils = require('../../util/utilFunctions');


/**
 * @name DownloadBillService timesheet service
 */
class DownloadBillService {


    static async downloadBill(req, user, local) {
        const bills = await TimeSheet.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'bills',
                    let: { billId: '$billId' },
                    pipeline: [
                        { $match: { '$expr': { '$eq': ['$_id', '$$billId'] } } },
                        {
                            $project: {
                                filePath: 1 
                            }
                        }
                    ],
                    as: 'bill'
                }
            },
            {
                $project: {
                    bill: { $arrayElemAt: ["$bill", 0] },

                }
            }
        ])

        if (!bills || !bills.length) {
            // throw new Error
        }
        const b = bills[0];
        const pdfPath = await UploadService.getSignedUrl(b.bill.filePath);;
        // console message when conversion is complete!
        return {
            pdfPath
        };

    }

    static calculateAmountPerDayPerWeek() {
        return {
            $cond: [{ $lt: [{ $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, this.mongoRoundTwoDecimal({
                $multiply: [{
                    $add: [
                        '$$w.hours',
                        {
                            $floor: {
                                $divide: ["$$w.minutes", 60]
                            }
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
            then: result //0.25
        };
    }

    static mapWeek(key, value, htmlContent) {
        let content = '';
        content += `<tbody>`
        value.map(arrValue => {
            content += `
                <tr>
                    <td></td>
                    <td></td>
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

    static prepareInvoiceObj(bill) {
        return {
            billDate: '',
            billNumber: '',
            weekStarting: MOMENT(bill.dateStart).format("Do MMM YYYY"),
            name: bill.user.name,
            address: bill.talent.addressLineOne + ', ' + bill.talent.city + ', ' + bill.talent.country,
            vatNumber: bill.vatNumber,
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
            currency: bill.talent.currency
        }
    }

    static async prepareHtml(timesheet) {
        let htmlContent = await readFileAsync('htmlTemplates/talent/bill.html', 'utf8');
        htmlContent = htmlContent.replace(new RegExp('##BASE_URL', 'g'), process.env.BASE_URL);
        for (const [key, value] of Object.entries(this.prepareInvoiceObj(timesheet))) {
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



    static async generatePdf2(htmlContent, id) {
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

        const pdfName = `${process.env.NODE_ENV}-bills/${id}_2.pdf`;

        const pdfPath = await UploadService.uploadPdf(buffer, pdfName);
        // console message when conversion is complete!
        return {
            pdfPath
        };
    }
}

module.exports = DownloadBillService;
