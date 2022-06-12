const mongoose = require('mongoose');
const JobPost = require('../../../../models/jobPost.model');
const Validator = require('../../../validation');

/**
 * Class represents services for get jobPost details based on it's id
 */
class JobPostDetailsService {
    /**
     * @desc This function is being used to get jobPost details based on it's id
     * @author CodeMonk
     * @since 14/02/2022
     * @param {Object} req Request
     * @param {String} req.params params jobPost id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details (req, user, local) {
        const validation = new Validator(local);
        await validation.checkId(req.params.id);
        const aggregateParams = JobPostDetailsService.getAggregateParams(user);
        aggregateParams.unshift({
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        });
        const jobPost = await JobPost.aggregate(aggregateParams);
        if (!jobPost.length) {
            throw new CodeMonkError(local('INVALID_BRIEF_REQUEST'), 400);
        }
        const brief = jobPost[0];
        return brief;
    }

    static getAggregateParams (user) {
        let aggregateParams = [];
        switch (user.role) {
            case CONSTANTS.ROLE.RECRUITER:
                aggregateParams = JobPostDetailsService.getRecruiterAggregations();
                break;
        }
        return aggregateParams;
    }

    static getRecruiterAggregations () {
        return [
            {
                $project: {
                    name: 1,
                    description: 1,
                    role: 1,
                    skills: 1,
                    workPreference: 1,
                    teamPreference: 1,
                    assignments: 1,
                    status: 1,
                    expertise: 1,
                    duration: 1,
                    step: 1,
                    hardSkills: 1,
                    softSkills: 1,
                    certifications: 1,
                    industry: 1,
                    teamWorking: 1,
                    discProfile: 1,
                    timeZone: 1,
                    ratePerHour: 1,
                    currency: 1,
                    languages: 1,
                    jobId: 1,
                    employmentType: 1,
                    currencyAnnualRate: 1,
                    annualRate: 1
                }
            }];
    }
}

module.exports = JobPostDetailsService;
