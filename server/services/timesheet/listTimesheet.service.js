const TimeSheet = require('../../models/timesheet.model');
const TimeSheetValidator = require('./timesheet.validator');
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
            projectName: { $arrayElemAt: ['$project.name', 0] },
            talentShortName: { $arrayElemAt: ['$user.talentShortName', 0] },
            clientName: {
                $reduce: {
                    input: '$client',
                    initialValue: '',
                    in: {
                        $concat: [ '$$this.firstName', ' ', '$$this.lastName']
                    }
                }
            },
            week: 1,
            projectId: 1,
            status: 1,
            attendedDays: { $sum: '$week.value' },
            talentId: 1,
            profilePicture: { $arrayElemAt: ['$user.profilePicture', 0] },
            id: { $toLong: { $toDate: '$_id' } }
        };
    }

    static commonPostProjection () {
        return {
            dateStart: 1,
            projectName: 1,
            talentShortName: 1,
            clientName: 1,
            week: 1,
            projectId: 1,
            status: 1,
            talentId: 1,
            id: 1,
            profilePicture: 1
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
    static async aggregateQuery (queryParam, talentId, role, status ) {
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
                        currency: 1
                    }
                }
            ],
            as: 'talent'
        });

        aggregate.project({
            ...this.commonProjection(),
            talent: { $arrayElemAt: ['$talent', 0] }
        });
        aggregate.project({
            ...this.commonPostProjection(),
            cost: { $multiply: ['$attendedDays', '$talent.cost'] },
            commission: { $multiply: ['$attendedDays', '$talent.commission'] },
            currency: '$talent.currency',
            talentId: '$talent._id'
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
        aggregate.project({
            ...this.commonProjection()
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
                        talentShortName:  '$firstName',
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
                        currency: 1
                    }
                }
            ],
            as: 'talent'
        });

        aggregate.project({
            ...this.commonProjection(),
            talent: { $arrayElemAt: ['$talent', 0] }
        });
        aggregate.project({
            ...this.commonPostProjection(),
            talentId: '$talent._id',
            cost: { $multiply: ['$attendedDays', '$talent.cost'] },
            currency: '$talent.currency'
        });
    }

    static getTimesheet (aggregate) {
        aggregate.project({
            ...this.commonProjection()
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
}

module.exports = ListTimeSheet;
