const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const Talent = require('../../models/talent.model');
const Validator = require('../validation');
const Utils = require('../../util/utilFunctions');
const AlgoServerService = require('../algoProxyServer/algoServerService');

/**
 * Class represents services for get jobPost details based on it's id
 */
class JobPostDetailsService {
    /**
     * @desc This function is being used to get jobPost details based on it's id
     * @author Innovify
     * @since 26/10/2020
     * @param {Object} req Request
     * @param {String} req.params params jobPost id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details(req, user, local) {
        const validation = new Validator(local);
        await validation.checkId(req.params.id);

        const aggregateParams = JobPostDetailsService.getAggregateParams(user);

        // Fetch & Append Recommended Applications into applications.
        const recTalents = await JobPostDetailsService.getRecCandidates(req, local);
        if (recTalents && Array.isArray(recTalents)) {
            aggregateParams.unshift(...this.appendRecToApplicants(recTalents));
        }
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

        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'applications', 'talentDetails');
        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'hiredApplicants', 'hiredTalents');
        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'interviewApplication', 'interviewTalents');
        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'shortlistedApplicants', 'shortlistedTalents');
        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'rejectedApplicants', 'rejectedTalents');
        JobPostDetailsService.appendUserDetailsWithTalentDetails(brief, user, 'recApplications', 'recommendedTalents', true);

        return brief;
    }

    static async getRecCandidates(req, local) {
        const aggregateRecommend = [];
        let recData = [];
        // Fetch Rcommended job data from Python API.
        const responseData = await AlgoServerService.getRecCandidatesFromJobId(req, local);

        if (responseData && responseData.data && Array.isArray(responseData.data)) {
            recData = responseData.data.map(item =>
                ({ ...item, id: mongoose.Types.ObjectId(item.id) })
            );
        }
        // Filter recommended candidates only.
        const recommendIds = recData.map(item => item.id) || [];
        aggregateRecommend.push(
            { $match: { _id: { $in: recommendIds } } }
        );
        // Add 'recommendOrder' field to be able to sort by recommended.
        aggregateRecommend.push({
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
        aggregateRecommend.push({
            $lookup: {
                from: 'users',
                let: { talentId: '$userId' },
                pipeline: [
                    {
                        $match: { $expr: { $eq: ['$$talentId', '$_id'] } }
                    },
                    {
                        $project: {
                            _ids: 1,
                        }
                    }
                ],
                as: 'user'
            }
        });
        aggregateRecommend.push({
            $project: {
                id: '$_id',
                talentId: '$userId',
                status: { $add: [0] },
                recommendOrder: 1
            }
        })
        return await Talent.aggregate(aggregateRecommend);
    }

    static appendRecToApplicants(recTalents) {
        return [{
            $addFields: {
                tempField1: {
                    $filter: {
                        input: recTalents,
                        as: 'rec',
                        cond: { $not: [{ $in: ['$$rec.talentId', '$applications.talentId'] }] }
                    }
                }
            }
        }, {
            $addFields: {
                applications: {
                    $concatArrays: ['$tempField1', '$applications']
                }
            }
        }];
    }

    static appendUserDetailsWithTalentDetails(brief, user, projectApplicants, projectTalents, sortRecommend = false) {

        if (Array.isArray(brief[projectApplicants])
            && [CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.CLIENT].includes(user.role)) {
            brief[projectTalents].forEach((d) => {
                brief[projectApplicants].forEach(t => {
                    if (d._id.toString() === t.userId.toString()) {
                        d.talentUserId = d._id;
                        d.talentId = t.tId;
                        d.primaryRole = t.primaryRole;
                        d.ratePerHour = t.ratePerHour;
                        d.currency = t.currency;
                        d.timeZone = t.timeZone;
                        d.city = t.city;
                        d.country = t.country;
                        d.registerType = t.registerType;
                        d.skills = t.skills;
                        d.workExperience = t.workExperience;
                        d.assignments = t.assignments;
                        d.workPreference = t.workPreference;
                        d.yearsOfExperience = t.yearsOfExperience;
                        d.experienceOrder = t.experienceOrder;
                        d.teamPreference = t.teamPreference;
                        d.formerEmployer = t.formerEmployer;
                        d.verifiedProfile = t.verifiedProfile;
                        d.recommendOrder = t.recommendOrder;
                    }
                });
            });
            if (sortRecommend) {
                brief[projectTalents].sort((a, b) => a.recommendOrder - b.recommendOrder);
            }
            delete brief[projectApplicants];
        }
    }

    static getAggregateParams(user) {
        let aggregateParams = [];
        switch (user.role) {
            case CONSTANTS.ROLE.TALENT:
                aggregateParams = JobPostDetailsService.getTalentAggregations(user._id);
                break;
            case CONSTANTS.ROLE.CLIENT:
                aggregateParams = JobPostDetailsService.getClientAggregations();
                break;
            case CONSTANTS.ROLE.ADMIN:
                aggregateParams = JobPostDetailsService.getAdminAggregations();
                break;
        }

        return aggregateParams;
    }

    static getTalentAggregations(userId) {
        return [{
            $lookup: {
                from: 'users',
                let: { t: '$applications' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$_id', '$$t.talentId'] } } },
                    {
                        $project: {
                            name: { $concat: ['$firstName', ' ', { $toUpper: { $substr: ['$lastName', 0, 1] } }, '.'] },
                            profilePicture: 1
                        }
                    }
                ],
                as: 'talentDetails'
            }
        },
            {
                $lookup: {
                    from: 'talents',
                    let: { t: '$applications' },
                    pipeline: [
                        { $match: { '$expr': { '$in': ['$userId', '$$t.talentId'] } } },
                        {
                            $project: {
                                tId: '$_id',
                                userId: 1,
                                primaryRole: 1,
                                // ratePerHour: 1,
                                // currency: 1,
                                timeZone: 1,
                                verifiedProfile: 1
                            }
                        },
                        {
                            $sort: { _id: -1 }
                        }],
                    as: 'applications'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'clientId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: 'clientId',
                    foreignField: 'userId',
                    as: 'client'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectId',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $project: {
                    projectId: 1,
                    user: { $arrayElemAt: ['$user', 0] },
                    client: { $arrayElemAt: ['$client', 0] },
                    project: { $arrayElemAt: ['$project', 0] },
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
                    applications: 1,
                    talentDetails: 1,
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
                    hiredTalents: 1,
                    talents: { $arrayElemAt: ['$project.talents', 0] }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { t: '$talents' },
                    pipeline: [
                        { $match: { '$expr': { '$in': ['$_id', { $ifNull: ['$$t.talentId', []] }] } } },
                        {
                            $project: {
                                name: { $concat: ['$firstName', ' ', { $toUpper: { $substr: ['$lastName', 0, 1] } }, '.'] },
                                profilePicture: 1,
                                lastName: { $concat: [{ $toUpper: { $substr: ['$lastName', 0, 1] } }, '.'] },
                                firstName: '$firstName',
                                status: {
                                    $reduce: {
                                        input: '$$t',
                                        initialValue: 0,
                                        in: {
                                            $cond: {
                                                if: { $eq: ['$$this.talentId', '$_id'] },
                                                then: '$$this.status',
                                                else: '$$value'
                                            }
                                        }
                                    }
                                }
                            },
                        },
                        { $match: { '$expr': { '$eq': ['$status', 1] } } },
                        { $project: { name: 1, lastName: 1, profilePicture: 1, firstName: 1 } }
                    ],
                    as: 'hiredTalents'
                }
            },
            {
                $project: {
                    projectId: 1,
                    companyName: '$client.billing.companyDetails.name',
                    'company.name': '$client.billing.companyDetails.name',
                    'company.city': '$client.billing.companyDetails.city',
                    'company.country': '$client.billing.companyDetails.country',
                    'company.timeZone': '$client.timeZone',
                    'project.name': 1,
                    'project.description': 1,
                    'project.status': 1,
                    clientId: '$client._id',
                    clientName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                    clientEmail: '$user.email',
                    projectName: '$project.name',
                    projectDescription: '$project.description',
                    projectTeamPreference: '$project.teamPreference',
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
                    applications: 1,
                    talentDetails: 1,
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
                    hiredTalents: 1,
                    isApplied: {
                        $cond: {
                            if: { $in: [userId, '$applications.userId'] },
                            then: true,
                            else: false
                        }
                    }
                }
            }];
    }

    static getAdminAggregations() {
        return [{
            $lookup: {
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'user'
            }
        },
            {
                $lookup: {
                    from: 'clients',
                    localField: 'clientId',
                    foreignField: 'userId',
                    as: 'client'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectId',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $project: {
                    projectId: 1,
                    user: { $arrayElemAt: ['$user', 0] },
                    client: { $arrayElemAt: ['$client', 0] },
                    project: { $arrayElemAt: ['$project', 0] },
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
                    appliedApplications: 1,
                    allApplications: '$applications',
                    talentDetails: 1,
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
                    annualRate: 1,
                    currencyAnnualRate: 1,
                    talents: { $arrayElemAt: ['$project.talents', 0] }
                }
            },
            ...JobPostDetailsService.getApplicantsWithUserDetails('applications', 'talentDetails', 1, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('hiredApplicants', 'hiredTalents', 4, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('interviewApplication', 'interviewTalents', 2, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('shortlistedApplicants', 'shortlistedTalents', 3, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('rejectedApplicants', 'rejectedTalents', 5, '$userId'),
            // Add recommendedTalents field with status 0.
            ...JobPostDetailsService.getApplicantsWithUserDetails('recApplications', 'recommendedTalents', 0, '$userId'),
            {
                $project: {
                    projectId: 1,
                    companyName: '$client.billing.companyDetails.name',
                    'company.name': '$client.billing.companyDetails.name',
                    'company.city': '$client.billing.companyDetails.city',
                    'company.country': '$client.billing.companyDetails.country',
                    'company.timeZone': '$client.timeZone',
                    'project.name': 1,
                    'project.description': 1,
                    'project.status': 1,
                    clientId: '$client._id',
                    clientName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                    clientEmail: '$user.email',
                    projectName: '$project.name',
                    projectDescription: '$project.description',
                    projectTeamPreference: '$project.teamPreference',
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
                    applications: 1,
                    talentDetails: 1,
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
                    hiredTalents: 1,
                    hiredApplicants: 1,
                    interviewApplication: 1,
                    interviewTalents: 1,
                    shortlistedTalents: 1,
                    shortlistedApplicants: 1,
                    rejectedTalents: 1,
                    rejectedApplicants: 1,
                    recApplications: 1,
                    recommendedTalents: 1,
                    employmentType: 1,
                    annualRate: 1,
                    currencyAnnualRate: 1
                }
            }];
    }

    static getClientAggregations() {
        return [{
            $lookup: {
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'project'
            }
        },
            {
                $project: {
                    projectId: 1,
                    projectName: { $arrayElemAt: ['$project.name', 0] },
                    projectTeamPreference: { $arrayElemAt: ['$project.teamPreference', 0] },
                    projectDescription: { $arrayElemAt: ['$project.description', 0] },
                    'project.name': { $arrayElemAt: ['$project.name', 0] },
                    'project.description': { $arrayElemAt: ['$project.description', 0] },
                    'project.status': { $arrayElemAt: ['$project.status', 0] },
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
                    isArchived: 1,
                    allApplications: '$applications',
                    talentDetails: 1,
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
                    employmentType: 1,
                    annualRate: 1,
                    currencyAnnualRate: 1,
                    talents: { $arrayElemAt: ['$project.talents', 0] }
                }
            },
            ...JobPostDetailsService.getApplicantsWithUserDetails('applications', 'talentDetails', 1, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('hiredApplicants', 'hiredTalents', 4, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('interviewApplication', 'interviewTalents', 2, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('shortlistedApplicants', 'shortlistedTalents', 3, '$userId'),
            ...JobPostDetailsService.getApplicantsWithUserDetails('rejectedApplicants', 'rejectedTalents', 5, '$userId'),
            // Add recommendedTalents field with status 0.
            ...JobPostDetailsService.getApplicantsWithUserDetails('recApplications', 'recommendedTalents', 0, '$userId')
        ];
    }

    static getApplicantsWithUserDetails(projectApplicants, projectTalents, status, talentUserId) {
        return [{
            $lookup: {
                from: 'talents',
                let: { t: '$allApplications' },
                pipeline: JobPostDetailsService.getPipelineForApplications(status, talentUserId),
                as: projectApplicants
            }
        },
            {
                $lookup: {
                    from: 'users',
                    let: { t: '$' + projectApplicants },
                    pipeline: JobPostDetailsService.getPipelineForUserDetails(),
                    as: projectTalents
                }
            }];
    }

    static getPipelineForUserDetails() {
        return [
            { $match: { '$expr': { '$in': ['$_id', '$$t.userId'] } } },
            {
                $project: {
                    profilePicture: 1,
                    email: 1,
                    phoneNumber: { $concat: ['+', '$countryCode', ' ', '$phoneNumber'] },
                    status: Utils.getUserStatus(true),
                    lastName: { $concat: [{ $toUpper: { $substr: ['$lastName', 0, 1] } }, '.'] },
                    firstName: '$firstName',
                    name: { $concat: ['$firstName', ' ', { $toUpper: { $substr: ['$lastName', 0, 1] } }, '.'] },
                }
            },
        ];
    }

    static getPipelineForApplications(status, talentUserId) {
        return [
            { $match: { $expr: { $in: [talentUserId, { $ifNull: ['$$t.talentId', []] }] } } },
            {
                $addFields: {
                    workExperience2: {
                        $filter: {
                            input: '$workExperience',
                            cond: { $eq: ['$$this.startDate', { $max: '$workExperience.startDate' }] }
                        }
                    },
                    status: JobPostDetailsService.getApplicationsStatusForTalent(talentUserId),
                    // Apppend the recommendOrder into recommendedTalents.
                    recommendOrder: JobPostDetailsService.getApplicationsRecommendOrderForTalent(talentUserId)
                }
            },
            { $match: { '$expr': { '$eq': ['$status', status] } } },
            {
                $addFields: {
                    workExperience2: { $arrayElemAt: ['$workExperience2', 0] }
                }
            },
            {
                $project: {
                    tId: '$_id',
                    status: 1,
                    userId: 1,
                    timeZone: 1,
                    primaryRole: 1,
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
                    currency: 1,
                    city: 1,
                    country: 1,
                    registerType: 1,
                    skills: 1,
                    workExperience: 1,
                    assignments: 1,
                    workPreference: 1,
                    yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                    experienceOrder: 1,
                    teamPreference: 1,
                    formerEmployer: '$workExperience2.employer',
                    verifiedProfile: 1,
                    recommendOrder: 1
                }
            }
        ];
    }

    static getApplicationsStatusForTalent(talentUserId) {
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

    static getApplicationsRecommendOrderForTalent(talentUserId) {
        return {
            $reduce: {
                input: '$$t',
                initialValue: 1000,
                in: {
                    $cond: {
                        if: { $eq: ['$$this.talentId', talentUserId] },
                        then: '$$this.recommendOrder',
                        else: '$$value'
                    }
                }
            }
        };
    }

}

module.exports = JobPostDetailsService;
