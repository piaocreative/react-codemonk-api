const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const Utils = require('../../util/utilFunctions');
const {
    commonTalentListCondition, validateSort, orFilterOnTalentList
} = require('../talentList/talentListService');
const { activeUserQuery } = require('../../util/utilFunctions');
const crypt = require('../../util/crypt');
const AlgoServerService = require('../algoProxyServer/algoServerService');
const SortParser = require('sort-parser');
const HubSpot = require('../hubSpot/hubSpot');
const TalentSearchValidator = require('./talentSearchValidator');
const sp = new SortParser(
    {
        format: SortParser.mongodb,
        fields: ['recommend', '_id', 'name', 'experienceOrder', 'description'],
        strict: true
    });
/**
 * Class represents services for Talent search with filter/s
 */
class TalentSearchService {
    /**
     * @desc This function is being used to search talent based on filter/s
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async search(req, user, local) {
        const sortParam = this.sortData(req.query);
        const options = {
            sort: sortParam,
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };
        const aggregateParams = [];
        let recData = [];

        const jobPostId = req.query.jobPostId;
        if (jobPostId) {
            // Fetch Recommended candidate data from Python API.
            if (sortParam && sortParam.recommendOrder) {
                // Validate if user is client and the requested jobpostId is not belong to him.
                if (user.role !== CONSTANTS.ROLE.ADMIN) {
                    const Validator = new TalentSearchValidator(req.query, local);
                    await Validator.validationJobPostId(jobPostId, user._id);
                }
                req.params.id = jobPostId;
                const responseData = await AlgoServerService.getRecCandidatesFromJobId(req);
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    recData = responseData.data.map(item =>
                        ({ ...item, id: mongoose.Types.ObjectId(item.id) })
                    );
                }
            }
        }

        // Filter only recommended candidates.
        const recommendIds = recData.map(item => item.id) || [];
        if (sortParam.recommendOrder) {
            aggregateParams.push(
                { $match: { _id: { $in: recommendIds } } }
            );
        }

        // Add 'recommendOrder' field to be able to sort by recommended.
        aggregateParams.push({
            $addFields: {
                recommendOrder: {
                    $reduce: {
                        input: recData,
                        initialValue: 1000,
                        in: {
                            $cond: {
                                if: { $eq: ["$_id", "$$this.id"] },
                                then: "$$this.rank",
                                else: "$$value"
                            }
                        }
                    }
                }
            }
        });

        const match = TalentSearchService.getAggregateMatch(req.query, local);

        aggregateParams.push(match);
        orFilterOnTalentList(req.query, aggregateParams, local);

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
                            isDelete: 1,
                            email: 1,
                            name: { $concat: ['$firstName', ' ', '$lastName'] }
                        }
                    }
                ],
                as: 'user'
            }
        });

        aggregateParams.push(
            {
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
            }
        );
        aggregateParams.push({
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] } }
        });

        aggregateParams.push({
            $match: {
                isDelete: 0
            }
        });

        aggregateParams.push({
            $project: {
                name: -1,
                profilePicture: 1,
                firstName: '$firstName',
                lastName: { $substr: ['$lastName', 0, 1] },
                city: 1,
                country: 1,
                timeZone: 1,
                primaryRole: 1,
                yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                experienceOrder: 1,
                industries: 1,
                companyCultures: 1,
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
                email: 1,
                formerEmployer: '$workExperience2.employer',
                verifiedProfile: 1,
                recommendOrder: 1,
                isRecommended: {
                    $cond: { if: { $lt: ['$recommendOrder', 1000] }, then: true, else: false }
                }
            }
        });
        if (req.query.q) {
            const searches = req.query.q.split(',');
            const searchQuery = searches.map((search) => {
                const query = new RegExp(search, 'i');
                return { 'skills.name': { $regex: query } };
            });
            aggregateParams.push({
                $match: {
                    $and: searchQuery
                }
            });
        }
        const aggregate = Talent.aggregate([aggregateParams]);
        const talents = await Talent.aggregatePaginate(aggregate, options);

        if (!req.query.allowedEmail || req.query.allowedEmail !== 'PythonAPI') {
            talents.docs.forEach((t) => {
                delete t.email;
            });
        }
        // Set hubspot contact action, don't wait.
        HubSpot.updateContact(user, { 'searched': true, 'last_search': req.query.skills });

        return talents;
    }

    /**
     * @desc This function is being used to get aggregate match i.e filter/s
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} params Query params
     */
    static getAggregateMatch(params, local) {
        const aggregateParams = {
            $match: activeUserQuery(true)
        };
        return commonTalentListCondition(params, aggregateParams, local);
    }

    static sortData(queryParam) {
        let sort = { '_id': -1 };
        if (queryParam.sort) {
            try {
                sort = sp(queryParam.sort);
                if (sort && sort.hasOwnProperty('recommend')) {
                    sort = { recommendOrder: 1, _id: -1 };
                }
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return sort;
    }


}

module.exports = TalentSearchService;
