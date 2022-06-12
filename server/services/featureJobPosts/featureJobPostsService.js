const JobPost = require('../../models/jobPost.model');
const Utils = require('../../util/utilFunctions');
const { getPageNumber, getLimit, splitAndAddFields } = require('../../util/utilFunctions');

/**
 * Class represents services for talent feature job posts
 */
class FeatureJobPostsService {
    /**
     * @desc This function is being used to get feature job posts
     * @author Innovify
     * @since 01/12/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async featureJobs(req) {
        const aggregateParams = [];
        const filter = FeatureJobPostsService.addFilters(req.query);
        aggregateParams.push(
            {
                $match: {
                    ...filter,
                    featureFlag: CONSTANTS.FEATURE_FLAG.ACTIVE
                }
            },
            {
                $project: {
                    projectId: 1,
                    name: 1,
                    description: 1,
                    role: 1,
                    skills: 1,
                    workPreference: 1,
                    teamPreference: 1,
                    assignments: 1,
                    expertise: { $arrayElemAt: [{ $split: ['$expertise', '-'] }, 0] },
                    duration: 1,
                    hardSkills: 1,
                    softSkills: 1,
                    certifications: 1,
                    industry: 1,
                    teamWorking: 1,
                    discProfile: 1,
                    timeZone: 1,
                    ratePerHour: 1,
                    currency: 1,
                    languages: 1
                }
            },
            {
                $sort: {
                    expertiseOrder: -1
                }
            },
            {
                $limit: Utils.getLimit(req.query.limit)
            }
        );
        return await JobPost.aggregate(aggregateParams);
    }

    static addFilters(filters, user, aggregate) {
        let match = {};
        const filterFields = [
            'role', 'hardSkills', 'workPreference', 'assignments'
        ];
        const isAnyFilter = filterFields.some((field) => {
            return Object.keys(filters).includes(field);
        });
        if (isAnyFilter) {
            const condition = splitAndAddFields(filters, filterFields);
            match = { ...match, ...condition };
        }
        return match;
    }

}

module.exports = FeatureJobPostsService;
