
const User = require('../../models/user.model');
const Utils = require('../../util/utilFunctions');
const AgencyProjectListService = require('../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for project list based on status
 */
class AgencyTalentListService {
    /**
     * @desc This function is being used to get agency talent list
     * @author Innovify
     * @since 29/09/2020
     * @param {Object} req Request
     * @param {Object} req.query request query params
     * @param {Object} user Logged in user object
     */
    static async agencyTalentList(req, user) {
        const options = {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(user._id);
        const aggregateParams = [{
            $match: {
                _id: { $in: agencyTalentIds }
            }
        },
        {
            $lookup: {
                from: 'talents',
                let: { t: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$userId', '$$t'] } } },
                    {
                        $project: {
                            talentId: '$_id',
                            ratePerHour: 1,
                            currency: 1,
                            availability: 1,
                            unavailability: 1,
                            workPreference: 1,
                            status: 1,
                            signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.BASIC_PROFILE
                        }
                    }],
                as: 'talentDetails'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$talentDetails', 0] }, '$$ROOT']
                }
            }
        },
        {
            $lookup: {
                from: 'projects',
                let: { t: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$$t', '$talents.talentId'] } } },

                    { "$unwind": "$talents" },
                    { $match: { '$expr': { '$eq': ['$$t', '$talents.talentId'] } } },
                    {
                        $project: {
                            status: {
                                $cond: [{
                                    $and: [
                                        {
                                            $in: ["$status", [CONSTANTS.PROJECT.STATUS['Discovery'],
                                            CONSTANTS.PROJECT.STATUS['Kick-off'],
                                            CONSTANTS.PROJECT.STATUS['In Progress']]]
                                        },
                                        { $lte: ['$talents.startDate',MOMENT().utc().toDate()] },
                                        { $gte: ['$talents.endDate', MOMENT().utc().toDate()] }

                                    ]
                                }, true, false]
                            }
                        }
                    }],
                as: 'projects'
            }
        },
        {
            $project: {
                hasActiveProject: {
                    $reduce: {
                        input: '$projects',
                        initialValue: false,
                        in: { $or: ['$$this.status','$$value']}
                    }
                },
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                talentDetails: 1,
                currency: 1,
                profilePicture: 1,
                rate: '$ratePerHour',
                availability: 1,
                talentId: 1,
                unavailability: 1,
                workPreference: 1,
                weekylyAvailability: Utils.getCurrentWeekDays(),
                status: Utils.getUserStatus(true)
            }
        }];

        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams[0].$match.$or = [{
                firstName: { $regex: query }
            },
            {
                lastName: { $regex: query }
            },
            {
                email: { $regex: query }
            }];
        }


        const aggregate = User.aggregate(aggregateParams);
        var data = await User.aggregatePaginate(aggregate, options);

        if (data.docs.length) {
            data.docs.map((d) => {
                if (d.workPreference && d.workPreference.length && d.availability) {
                    d.weekylyAvailability = Utils.weekylyAvailability(d.weekylyAvailability, d.workPreference, d.unavailability);
                }
                delete d.talentDetails;
            });
        }
        return data;
    }
}

module.exports = AgencyTalentListService;
