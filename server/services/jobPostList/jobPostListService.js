const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const { getPageNumber, getLimit, splitAndAddFields } = require('../../util/utilFunctions');
const User = require('../../models/user.model');
const { Types: { ObjectId } } = require('mongoose');
const { ROLE: { CLIENT, TALENT, ADMIN, AGENCY } } = require('../../util/constants');
const AlgoServerService = require('../algoProxyServer/algoServerService');
const moment = require('moment');
const SortParser = require('sort-parser');
const sp = new SortParser({
    format: SortParser.mongodb,
    fields: ['recommend', '_id', 'name', 'seniority'],
    strict: true
});

/**
 * Class represents services for talent job post list based on status
 */
class JobPostListService {
    /**
     * @desc This function is being used to get talent job post list based on status
     * @author Innovify
     * @since 26/10/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list(req, user, isNew) {
        const sortParam = this.sortData(req.query);
        const options = {
            sort: sortParam,
            page: getPageNumber(req.query.page),
            limit: getLimit(req.query.limit),
            lean: true
        };
        const aggregateParams = [];
        let recData = [];

        if (user.fromTalent && user.fromTalent._id) {
            // Fetch Rcommended job data from Python API.
            if (sortParam && sortParam.recommendOrder) {
                req.params.id = user.fromTalent._id;
                const responseData = await AlgoServerService.getRecJobsFromTalentId(req);
                if (responseData && responseData.data && Array.isArray(responseData.data)) {
                    recData = responseData.data.map(item =>
                        ({ ...item, id: mongoose.Types.ObjectId(item.id) })
                    );
                }
            }
        }

        // Filter only recommended jobs.
        const recommendIds = recData.map(item => item.id) || [];
        if (sortParam.recommendOrder) {
            aggregateParams.push({
                $match: {
                    _id: {
                        $in: recommendIds
                    }
                }
            })
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

        const aggregate = JobPost.aggregate(aggregateParams);

        JobPostListService.addFilters(req.query, user, aggregate);
        const project = {
            projectId: 1,
            name: 1,
            description: 1,
            role: 1,
            hardSkills: 1,
            ratePerHour: 1,
            currency: 1,
            skills: 1,
            workPreference: 1,
            teamPreference: 1,
            assignments: 1,
            expertise: 1,
            duration: 1,
            isArchived: 1,
            timeZone: 1,
            jobId: 1,
            employmentType: 1,
            annualRate: 1,
            currencyAnnualRate: 1,
            companyName: '$client.billing.companyDetails.name',
            clientId: '$client.userId',
            clientEmail: '$user.email',
            hiredApplicants: 1,
            interviewApplicants: 1,
            shortlistedApplicants: 1,
            rejectedApplicants: 1,
            talentDetails: 1,
            talents: 1,
            expertiseOrder: 1,
            recommendOrder: 1,
            isRecommended: {
                $cond: { if: { $lt: ['$recommendOrder', 1000] }, then: true, else: false }
            },
            annualRate:1,
            currencyAnnualRate:1,
            employmentType:1
        };
        this.getProjectName(aggregate, user.role);
        if (user.role === TALENT) {
            project.isApplied = {
                $cond: {
                    if: { $in: [user._id, '$applications.talentId'] },
                    then: true,
                    else: false
                }
            };
        } else {
            project.projectName = '$project.name';
            project.projectDescription = '$project.description';
            JobPostListService.lookUpApplicantDetails(aggregate);
            project.applicants = '$talentDetails';
        }

        this.searchQuery(aggregate, req.query.q, user.role);
        aggregate.project(project);
        const data = await JobPost.aggregatePaginate(aggregate, options);
        await JobPostListService.addLastVisitedKey(user, isNew);
        return data;
    }

    static sortData(queryParam) {
        let sort = { '_id': -1 };
        if (queryParam.sort) {
            try {
                sort = sp(queryParam.sort);
                if (sort && sort.hasOwnProperty('recommend')) {
                    sort = { recommendOrder: 1, _id: -1 };
                }
                else if (sort && sort.hasOwnProperty('seniority')) {
                    sort = { expertiseOrder: 1, _id: -1 };
                }
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return sort;
    }

    static lookUpApplicantDetails(aggregate) {

   
        aggregate.lookup(JobPostListService.getApplicantsWithUserDetails('talentDetails', 1, '$_id'));
        aggregate.lookup(JobPostListService.getApplicantsWithUserDetails('hiredApplicants', 4, '$_id'));

        aggregate.lookup(JobPostListService.getApplicantsWithUserDetails('interviewApplicants', 2, '$_id'));
        aggregate.lookup(JobPostListService.getApplicantsWithUserDetails('shortlistedApplicants', 3, '$_id'));
        aggregate.lookup(JobPostListService.getApplicantsWithUserDetails('rejectedApplicants', 5, '$_id'));
    }

    /**
     * Update last visited entry in talents
     * @param {Object} user
     * @param {boolean} isNew
     */
    static async addLastVisitedKey(user, isNew) {
        if (user.role === TALENT && isNew) {
            await User.updateOne({
                _id: ObjectId(user._id)
            }, {
                briefLastVisited: MOMENT()
            });
        }
    }

    /**
     * Add filters in Brief list
     * @param {object} filters req object
     * @param {object} user user object
     * @param {object} aggregate
     */
    static addFilters(filters, user, aggregate) {
        let match = {};
        const filterFields = [
            'expertise', 'role', 'skills',
            'workPreference', 'assignments', 'teamPreference'
        ];

        const isAnyFilter = filterFields.some((field) => {
            return Object.keys(filters).includes(field);
        });
        if (isAnyFilter) {
            const condition = splitAndAddFields(filters, filterFields);
            match = { ...match, ...condition };
        }

        if (user.role === CLIENT) {
            match.clientId = user._id;
            if (filters.status && filters.status === 'active') {
                match.isArchived = false;
            } else if (filters.status && filters.status === 'archived') {
                match.isArchived = true;
            }
        }
        if (user.role === TALENT || user.role === AGENCY) {
            match.isArchived = false;
            match.status = CONSTANTS.BRIEF.STATUS.ACTIVE;
        }

        if (user.role === ADMIN && filters.status && filters.status === 'active') {
            match.isArchived = false;
        } else if (user.role === ADMIN && filters.status && filters.status === 'archived') {
            match.isArchived = true;
        }

        JobPostListService.appliedFilter(filters, match, user._id);
        switch (filters.datePosted) {
            case 'Last 24 hours':
                match.createdAt = { $gte: moment().subtract(24, 'hours').toDate() };
                break;
            case 'Last 7 days':
                match.createdAt = { $gte: moment().subtract(7, 'days').toDate() };
                break;
            case 'Last 14 days':
                match.createdAt = { $gte: moment().subtract(14, 'days').toDate() };
                break;
            case 'Last 30 days':
                match.createdAt = { $gte: moment().subtract(30, 'days').toDate() };
                break;
            default:
                break;
        }
        if (Object.keys(match).length) {
            aggregate.match(match);
        }
    }

    static appliedFilter(filters, match, userId) {
        switch (filters.applied) {
            case 'Applied':
                match['applications.talentId'] = userId;
                break;
            case 'Not Applied':
                match['applications.talentId'] = { $ne: userId };
                break;
            default:
                break;
        }
    }

    /**
     *
     * add project name in query for clients
     * @param {Object} aggregate
     */
    static getProjectName(aggregate, role) {

        if (role === ADMIN) {
            aggregate.lookup({
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'user'
            });
        }
        if (!(role === TALENT)) {
            aggregate.lookup({
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'project'
            });
        }
        aggregate.lookup({
            from: 'clients',
            localField: 'clientId',
            foreignField: 'userId',
            as: 'client'
        });

        aggregate.project({
            expertiseOrder: 1,
            recommendOrder: 1,
            projectId: 1,
            client: { $arrayElemAt: ['$client', 0] },
            user: { $arrayElemAt: ['$user', 0] },
            project: { $arrayElemAt: ['$project', 0] },
            name: 1,
            description: 1,
            role: 1,
            skills: 1,
            hardSkills: 1,
            ratePerHour: 1,
            currency: 1,
            workPreference: 1,
            teamPreference: 1,
            assignments: 1,
            expertise: 1,
            applications: 1,
            duration: 1,
            isArchived: 1,
            timeZone: 1,
            jobId: 1,
            employmentType: 1,
            annualRate: 1,
            currencyAnnualRate: 1,
            talents: { $arrayElemAt: ['$project.talents', 0] }
        });
    }

    /**
     * Add search in brief list
     * @param {object} aggregate
     * @param {string} q
     */
    static searchQuery(aggregate, q, role) {
        if (!q) {
            return;
        }
        const query = new RegExp(q, 'i');
        const condition = [
            { 'name': { $regex: query } },
            { 'description': { $regex: query } }
        ];

        if (role === CLIENT) {
            condition.push({ 'project.name': { $regex: query } });
        }
        if (role === ADMIN) {
            condition.push(
                { 'project.name': { $regex: query } },
                {
                    'client.billing.companyDetails.name': { $regex: query }
                },
                {
                    'user.email': { $regex: query }
                },
            );
        }
        aggregate.match({
            $or: condition
        });
    }

    static getApplicantsWithUserDetails (projectApplicants, status, talentUserId) {
        return {
            from: 'users',
            let: { t: '$applications' },
            pipeline: JobPostListService.getPipelineForApplications(status, talentUserId),
            as: projectApplicants
        };
    }

    static getPipelineForApplications (status, talentUserId) {
        return [
            { $match: { '$expr': { '$in': [talentUserId, { $ifNull: ['$$t.talentId', []] }] } } },
            {
                $addFields: {
                    status: JobPostListService.getApplicationsStatusForTalent(talentUserId)
                }
            },
            { $match: { '$expr': { '$eq': ['$status', status] } } },
            {
                $project: {
                    name: { $concat: ['$firstName', ' ', '$lastName'] },
                    profilePicture: 1
                }
            }
        ];
    }

    static getApplicationsStatusForTalent (talentUserId) {
        return {
            $reduce: {
                input: '$$t',
                initialValue: 0,
                in: {
                    $cond: {
                        if: { $eq: ['$$this.talentId', talentUserId] },
                        then: '$$this.status',
                        else: '$$value'
                    }
                }
            }
        };
    }

}

module.exports = JobPostListService;
