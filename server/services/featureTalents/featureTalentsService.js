const Talent = require('../../models/talent.model');
const Utils = require('../../util/utilFunctions');
const TalentListService = require('../talentList/talentListService');

/**
 * Class represents services for talent feature talents
 */
class FeatureTalentsService {
    /**
     * @desc This function is being used to get feature talents
     * @author Innovify
     * @since 04/12/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async featureTalents (req, user, local) {
        const aggregateParams = [];
        aggregateParams.push({
            $match: {
                isActive: 1,
                $or: [{
                    registerType: 'freelancer',
                    signupStep: { $gte: CONSTANTS.TALENT.ACTIVE_STATUS }
                },
                {
                    registerType: 'agency',
                    signupStep: { $gte: CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS }
                }]
            }
        });

        const statusSearch = { $match: {} };
        TalentListService.commonTalentListCondition(req.query, statusSearch, local);

        aggregateParams.push(statusSearch);

        aggregateParams.push({
            $lookup: {
                from: 'users',
                let: { talentId: '$userId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                    {
                        $project: {
                            talentUserId: '$_id',
                            profilePicture: 1,
                            firstName: 1,
                            lastName: 1,
                            name: { $concat: ['$firstName', ' ', '$lastName'] }
                        }
                    }
                ],
                as: 'user'
            }
        });
        aggregateParams.push({
            $addFields: {
                workExperience2: {
                    $filter: {
                        input: '$workExperience',
                        cond: { $eq: ['$$this.startDate', { $max: '$workExperience.startDate' }] }
                    }
                }
            }
        },
        {
            $addFields: {
                workExperience2: { $arrayElemAt: ['$workExperience2', 0] }
            }
        });
        aggregateParams.push({
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] } }
        });

        aggregateParams.push({
            $project: {
                name: -1,
                profilePicture: 1,
                firstName: '$firstName',
                lastName: '',
                city: 1,
                country: 1,
                timeZone: 1,
                primaryRole: 1,
                yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                experienceOrder: 1,
                ratePerHour: {
                    $sum: [CONSTANTS.FIXED_RATE, {
                        $divide: [{
                            $subtract: [
                                { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                { $mod: [{ $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                            ]
                        }, 100]
                    }]
                },
                workPreference: 1,
                professionalSummary: 1,
                assignments: 1,
                teamPreference: 1,
                certificateDetails: 1,
                workExperience: 1,
                currency: 1,
                skills: 1,
                availability: 1,
                industries: 1,
                formerEmployer: '$workExperience2.employer',
                verifiedProfile: 1
            }
        });


        const options = {
            sort: this.sortData(req.query),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };

        options.limit = options.limit > 27 ? 27 : options.limit;

        const aggregate = Talent.aggregate(aggregateParams);
        const result = await Talent.aggregatePaginate(aggregate, options);
        return { docs: result.docs };
    }

    static sortData (queryParam) {
        let sort = { experienceOrder: -1 };
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

module.exports = FeatureTalentsService;
