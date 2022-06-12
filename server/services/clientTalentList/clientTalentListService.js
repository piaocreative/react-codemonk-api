const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for Talent list based on status
 */
class ClientTalentListService {
    /**
     * @desc This function is being used to client Talent list
     * @author Innovify
     * @since 13/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async clientTalents (req, user) {
        const options = {
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };

        const aggregateParams = [{
            $match: {
                clientId: user._id
            }
        },
        {
            $project: {
                projectName: '$name',
                talents: 1
            }
        },
        { $unwind: { path: '$talents' } },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: ['$talents', '$$ROOT']
                }
            }
        },
        { $sort: { 'talents._id': -1 } },
        {
            $lookup: {
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
                as: 'talentUserDetails'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$talentUserDetails', 0] }, '$$ROOT']
                }
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
                            tId: '$_id',
                            primaryRole: 1,
                            currency: 1,
                            ratePerHour: {
                                $sum: [CONSTANTS.FIXED_RATE, {
                                    $divide: [{
                                        $subtract: [
                                            { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                            { $mod: [{ $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                                        ]
                                    }, 100]
                                }]
                            }
                        }
                    }
                ],
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
            $project: {
                talentUserId: '$talentId',
                talentShortName: 1,
                profilePicture: 1,
                primaryRole: 1,
                projectName: 1,
                talentId: '$tId',
                currency: 1,
                ratePerHour: 1,
                allocationTill: '$endDate',
                endDate: 1,
                startDate: 1,
                status: 1
            }
        }];

        const aggregate = Project.aggregate([aggregateParams]);
        return await Project.aggregatePaginate(aggregate, options);
    }
}

module.exports = ClientTalentListService;
