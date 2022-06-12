const TimeSheet = require('../../models/timesheet.model');
const TimeSheetValidator = require('./addTimesheet.validator');
const Utils = require('../../util/utilFunctions');
const User = require('../../models/user.model');
const { getAgencyTalentsUserIds } = require('../agencyProjectList/agencyProjectListService');
const {
    TIMESHEET: { TALENT_STATUS, AGENT_STATUS, ADMIN_STATUS, CLIENT_STATUS },
    ROLE: { CLIENT, AGENCY, ADMIN, TALENT }
} = require('../../util/constants');
const { Types: { ObjectId } } = require('mongoose');

/**
 * Class represents services for admin add job post details.
 */
class ListTimeSheet {

    static commonProjection () {
        return {
            dateStart: 1,
            approvedOn: 1,
            projectName: { $arrayElemAt: ['$project.name', 0] },
            talentShortName: { $arrayElemAt: ['$user.talentShortName', 0] },
            clientName: {
                $reduce: {
                    input: '$client',
                    initialValue: '',
                    in: {
                        $concat: ['$$this.firstName', ' ', '$$this.lastName']
                    }
                }
            },
            week: 1,
            projectId: 1,
            status: 1,
            attendedDays: { $sum: '$week.value' },
            workSummary: {
                $reduce: {
                    input: '$week',
                    initialValue: { effectiveHours: 0, effectiveMinutes: 0, effectiveDay: 0, hours: 0, minutes: 0 },
                    in: {
                        effectiveHours: { $add: [{ $cond: [{ $lt: [{ $add: ['$$this.hours', { $divide: ['$$this.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, '$$this.hours', 0] }, '$$value.effectiveHours'] },
                        effectiveMinutes: { $add: [{ $cond: [{ $lt: [{ $add: ['$$this.hours', { $divide: ['$$this.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, '$$this.minutes', 0] }, '$$value.effectiveMinutes'] },
                        effectiveDay: { $add: [{ $cond: [{ $gte: [{ $add: ['$$this.hours', { $divide: ['$$this.minutes', 60] }] }, CONSTANTS.TIMESHEET.DAY.HOURS] }, 1, 0] }, '$$value.effectiveDay'] },
                        hours: { $add: ['$$this.hours', '$$value.hours'] },
                        minutes: { $add: ['$$this.minutes', '$$value.minutes'] }
                    }
                }
            },
            talentId: 1,
            profilePicture: { $arrayElemAt: ['$user.profilePicture', 0] },
            id: { $toLong: '$createdAt' }
        };
    }

    static commonPostProjection () {
        return {
            dateStart: 1,
            projectName: 1,
            talentShortName: 1,
            clientName: 1,
            ...this.commonWeekProjection(),
            projectId: 1,
            status: 1,
            talentId: 1,
            id: 1,
            profilePicture: 1
        };
    }

    static commonWeekProjection () {
        const dayTemp = { $add: ['$$w.hours', { $divide: ['$$w.minutes', 60] }] };
        return {
            'week': {
                '$map': {
                    'input': '$week',
                    'as': 'w',
                    'in': {
                        'date': '$$w.date',
                        'hours': '$$w.hours',
                        'minutes': '$$w.minutes',
                        'value': '$$w.value',
                        'day':
                        {
                            $switch:
                            {
                                branches: [
                                    ListTimeSheet.upperControlLimit(dayTemp, 0, 2, 0.25),
                                    ListTimeSheet.upperControlLimit(dayTemp, 2, 4, 0.5),
                                    ListTimeSheet.upperControlLimit(dayTemp, 4, 6, 0.75),
                                    {
                                        case: { $gt: [dayTemp, 6] },
                                        then: 1
                                    }
                                ],
                                default: 0
                            }
                        }
                    }
                }
            }
        };
    }

    static upperControlLimit (value, low, high, result) {
        return {
            case: {
                $and: [{ $gt: [value, low] },
                    { $lte: [value, high] }]
            },
            then: result // 0.25
        };
    }

    /**
     * @desc This function is being used to get list of timesheet
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async listTimeSheet (req, user, local, isNew) {
        const validator = new TimeSheetValidator(req.query, local);
        const expectedStatus = ListTimeSheet.getStatusForRole(user);

        if (req.query.status) {
            validator.checkStatus(expectedStatus);
        }
        const { aggregate } = await this.aggregateQuery(req.query, user._id, user.role, expectedStatus);
        const data = await TimeSheet.aggregatePaginate(aggregate, {
            sort: this.sortData(req.query),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        });

        if (isNew) {
            await User.updateOne({
                _id: ObjectId(user._id)
            }, {
                timesheetLastVisited: MOMENT()
            });
        }
        return data;
    }

    static getStatusForRole (user) {
        let expectedStatus;
        switch (user.role) {
            case AGENCY:
                expectedStatus = AGENT_STATUS;
                break;
            case CLIENT:
                expectedStatus = CLIENT_STATUS;
                break;
            case ADMIN:
                expectedStatus = ADMIN_STATUS;
                break;
            default:
                expectedStatus = TALENT_STATUS;
                break;
        }
        return expectedStatus;
    }

    /**
     * @desc This function is being used to get list of timesheet
     * @param {Object} queryParam Filter object
     * @param {string} talentId User Id
     */
    static async aggregateQuery (queryParam, talentId, role, status) {
        const query = await ListTimeSheet.roleWiseMatch(role, talentId);
        if (queryParam.status) {
            query.status = parseInt(queryParam.status);
        } else {
            query.status = { $in: status };
        }

        if (queryParam.projectId) {
            query.projectId = ObjectId(queryParam.projectId);
        }

        const aggregate = TimeSheet.aggregate([{
            $match: query
        }]);

        aggregate.lookup({
            'from': 'projects',
            'let': { 'projectId': '$projectId' },
            'pipeline': [
                { '$match': { '$expr': { '$eq': ['$_id', '$$projectId'] } } },
                { '$project': { 'name': 1 } }
            ],
            'as': 'project'
        });

        if (queryParam.q) {
            const searchQuery = new RegExp(queryParam.q, 'i');
            aggregate.match({ 'project.name': searchQuery });
        }

        if (queryParam.talentId) {
            aggregate.match({ 'talentId': ObjectId(queryParam.talentId) });
        }

        if (queryParam.weekStart) {
            aggregate.match({ 'week.date': new Date(queryParam.weekStart) });
        }

        if (role === CLIENT) {
            ListTimeSheet.getClientTalents(aggregate);
        } else if (role === AGENCY) {
            ListTimeSheet.getAgencyTalents(aggregate);
        } else if (role === ADMIN) {
            ListTimeSheet.getAdminTalents(aggregate);
        } else {
            ListTimeSheet.getTimesheet(aggregate);
        }

        return { aggregate };
    }

    static getAdminTalents (aggregate) {
        aggregate.lookup({
            from: 'users',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                {
                    $project: {
                        talentShortName: {
                            $concat: ['$firstName', ' ', '$lastName']
                        },
                        profilePicture: 1
                    }
                }
            ],
            as: 'user'
        });

        aggregate.lookup({
            from: 'users',
            localField: 'clientId',
            foreignField: '_id',
            as: 'client'
        });
  

        aggregate.lookup({
            from: 'talents',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$userId', '$$talentId'] } } },
                {
                    $project: {
                        cost: '$ratePerHour',
                        commission: {
                            $divide: [{
                                $subtract: [
                                    { $multiply: [{ $multiply: ['$ratePerHour', (CONSTANTS.RATE_MULTIPLIER - 1)] }, 100] },
                                    { $mod: [{ $multiply: [{ $multiply: ['$ratePerHour', (CONSTANTS.RATE_MULTIPLIER - 1)] }, 100] }, 1] }
                                ]
                            }, 100]
                        },
                        dayOfCost: '$ratePerDay',
                        dayOfCommission: {
                            $divide: [{
                                $subtract: [
                                    { $multiply: [{ $multiply: ['$ratePerDay', (CONSTANTS.RATE_MULTIPLIER - 1)] }, 100] },
                                    { $mod: [{ $multiply: [{ $multiply: ['$ratePerDay', (CONSTANTS.RATE_MULTIPLIER - 1)] }, 100] }, 1] }
                                ]
                            }, 100]
                        },
                        currency: 1
                    }
                }
            ],
            as: 'talent'
        });

              
        aggregate.lookup({
            from: 'bills',
            let: { billId: '$billId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$billId'] } } },
                { $project: { billNumber: 1 } }
            ],
            as: 'bill'
        });

        aggregate.project({
            ... this.commonProjection(),
            generatedBill: { $toString: '$billId' },
            talent: { $arrayElemAt: ['$talent', 0] },
            earning: 1,
            commission: 1,
            currency: 1,
            ratePerHour: 1,
            ratePerDay: 1,
            bill: { $arrayElemAt: ['$bill', 0] }
        });
        aggregate.project({
            ... this.commonPostProjection(),
            ... this.commonTimeProjection(),
            cost: '$earning',
            ... this.commonCommissionProjection(),
            currency: 1,
            talentId: '$talent._id',
            ratePerHour: 1,
            ratePerDay: 1,
            approvedOn: 1,
            generatedBill: { $cond: [{ $not: ['$generatedBill'] }, false, true] },
            billNumber: '$bill.billNumber'
        });
    }

    static getAgencyTalents (aggregate) {
        aggregate.lookup({
            from: 'users',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                {
                    $project: {
                        talentShortName: {
                            $concat: ['$firstName', ' ', '$lastName']
                        },
                        profilePicture: 1
                    }
                }
            ],
            as: 'user'
        });
        aggregate.lookup({
            from: 'talents',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$userId', '$$talentId'] } } },
                {
                    $project: {
                        earning: '$ratePerHour',
                        dayOfEarning: '$ratePerDay',
                        currency: 1
                    }
                }
            ],
            as: 'talent'
        });

        aggregate.lookup({
            from: 'bills',
            let: { billId: '$billId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$billId'] } } },
                { $project: { billNumber: 1 } }
            ],
            as: 'bill'
        });

        aggregate.project({
            ...this.commonProjection(),
            generatedBill: { $toString: '$billId' },
            talent: { $arrayElemAt: ['$talent', 0] },
            earning: 1,
            currency: 1,
            ratePerHour: 1,
            ratePerDay: 1,
            bill: { $arrayElemAt: ['$bill', 0] }
        });

        aggregate.project({
            ...this.commonPostProjection(),
            ...this.commonTimeProjection(),
            ...this.commonEarningProjection(),
            currency: 1,
            ratePerHour: 1,
            ratePerDay: 1,
            talentId: '$talent._id',
            generatedBill: { $cond: [{ $not: ['$generatedBill'] }, false, true] },
            billNumber: '$bill.billNumber'
        });
    }

    static getClientTalents (aggregate) {
        aggregate.lookup({
            from: 'users',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                {
                    $project: {
                        talentShortName: '$firstName',
                        profilePicture: 1
                    }
                }
            ],
            as: 'user'
        });

        aggregate.lookup({
            from: 'talents',
            let: { talentId: '$talentId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$userId', '$$talentId'] } } },
                {
                    $project: {
                        cost: {
                            $divide: [{
                                $subtract: [
                                    { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                    { $mod: [{ $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                                ]
                            }, 100]
                        },
                        dayOfCost: {
                            $divide: [{
                                $subtract: [
                                    { $multiply: [{ $multiply: ['$ratePerDay', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                    { $mod: [{ $multiply: [{ $multiply: ['$ratePerDay', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                                ]
                            }, 100]
                        },
                        currency: 1
                    }
                }
            ],
            as: 'talent'
        });

        aggregate.lookup({
            from: 'bills',
            let: { billId: '$billId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$billId'] } } },
                { $project: { billNumber: 1 } }
            ],
            as: 'bill'
        });

        aggregate.project({
            ...this.commonProjection(),
            cost: 1,
            currency: 1,
            talent: { $arrayElemAt: ['$talent', 0] },
            bill: { $arrayElemAt: ['$bill', 0] }
        });
        aggregate.project({
            ...this.commonPostProjection(),
            ... this.commonTimeProjection(),
            talentId: '$talent._id',
            ... this.commonCostProjection(),
            currency: 1,
            billNumber: '$bill.billNumber'
        });
    }

    static getTimesheet (aggregate) {
        aggregate.lookup({
            from: 'bills',
            let: { billId: '$billId' },
            pipeline: [
                { $match: { '$expr': { '$eq': ['$_id', '$$billId'] } } },
                { $project: { billNumber: 1 } }
            ],
            as: 'bill'
        });

        aggregate.project({
            ...this.commonProjection(),
            earning: 1,
            currency: 1,
            ratePerHour: 1,
            ratePerDay: 1,
            generatedBill: { $toString: '$billId' },
            bill: { $arrayElemAt: ['$bill', 0] }
        });

        aggregate.project({
            ...this.commonPostProjection(),
            ...this.commonTimeProjection(),
            ...this.commonEarningProjection(),
            currency: 1,
            ratePerHour: 1,
            ratePerDay: 1,
            generatedBill: { $cond: [{ $not: ['$generatedBill'] }, false, true] },
            billNumber: '$bill.billNumber'
        });
    }

    static async roleWiseMatch (role, talentId) {
        const query = {};
        if (role === CLIENT) {
            query.clientId = talentId;
        } else if (role === AGENCY) {
            const talentIds = await getAgencyTalentsUserIds(talentId);
            query.talentId = { $in: talentIds };
        } else if (role === TALENT) {
            query.talentId = talentId;
        }
        return query;
    }

    static sortData (queryParam) {
        let sort = { _id: -1 };
        if (queryParam.sort) {
            try {
                sort = JSON.parse(queryParam.sort);
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return sort;
    }

    static commonEarningProjection () {
        return {
            earning: 1
        };
    }

    static commonCommissionProjection () {
        return {
            commission: 1
        };
    }

    static commonCostProjection () {
        return {
            cost: 1
        };
    }

    static mongoRoundTwoDecimal (number) {
        const round = {
            $divide: [
                {
                    $subtract: [
                        { $multiply: [number, 100] },
                        { $mod: [{ $multiply: [number, 100] }, 1] }
                    ]
                },
                100]
        };
        return round;
    }

    static commonTimeProjection () {
        const displayHours = {
            $add: [
                '$workSummary.effectiveHours',
                {
                    $floor: {
                        $divide: ['$workSummary.effectiveMinutes', 60]
                    }
                }
            ]
        };
        const displayMinutes = {
            $mod: ['$workSummary.effectiveMinutes', 60]
        };
        return {
            workSummary: 1,
            times: {
                $concat: [
                    ListTimeSheet.displayTimesComponent('$workSummary.effectiveDay', 'd'),
                    ListTimeSheet.displayTimesComponent(displayHours, 'h'),
                    ListTimeSheet.displayTimesComponent(displayMinutes, 'm')
                ]
            }
        };
    }


    static displayTimesComponent (value, postCharacter) {
        return {
            $cond: [
                {
                    $gt: [
                        value, 0
                    ]
                },
                {
                    $concat: [
                        ' ',
                        {
                            $toString: value
                        },
                        postCharacter
                    ]
                },
                ''
            ]
        };
    }
}

module.exports = ListTimeSheet;
