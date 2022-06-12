const mongoose = require('mongoose');
const Project = require('../../../models/project.model');
const Utils = require('../../../util/utilFunctions');
const AgencyProjectListService = require('../../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for get project details based on it's id
 */
class ProjectDetailsService {
    /**
     * @desc This function is being used to get project details based on it's id
     * @author CodeMonk
     * @since 3/12/2021
     * @param {Object} req Request
     * @param {String} req.params params project id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details (req, user, local) {
        const aggregateParams = await ProjectDetailsService.getAggregateParams(req.params.id, user);
        const projectDetails = await Project.aggregate(aggregateParams);

        if (projectDetails && projectDetails.length
            && projectDetails[0].talents && projectDetails[0].talents.length) {
            projectDetails[0].talentsDetails.map((d) => {
                projectDetails[0].talents.map(t => {
                    if (d._id.toString() === t.talentId.toString()) {
                        d.status = (t.status === 1) ? 'Active' : 'Inactive';
                        d.startDate = t.startDate;
                        d.endDate = t.endDate;
                        d.allocationTill = (d.endDate) ? d.endDate : '';
                        if (user.role !== CONSTANTS.ROLE.TALENT) {
                            projectDetails[0].talentsExtraDetails.map(e => {
                                if (d._id.toString() === e.userId.toString()) {
                                    d.talentUserId = d._id;
                                    d.talentId = e.tId;
                                    d.primaryRole = e.primaryRole;
                                    d.ratePerHour = e.ratePerHour;
                                    d.currency = e.currency;
                                    d.city = e.city;
                                    d.country = e.country;
                                    d.timeZone = e.timeZone;
                                    d.yearsOfExperience = e.yearsOfExperience;
                                    d.experienceOrder = e.experienceOrder;
                                    d.verifiedProfile = e.verifiedProfile;
                                }
                            });
                        }
                    }
                });
            });
        }

        if (projectDetails && projectDetails.length
            && projectDetails[0].talentsExtraDetails && projectDetails[0].talentsExtraDetails.length
            && user.role === CONSTANTS.ROLE.TALENT) {
            projectDetails[0].talentsDetails.map((d) => {
                projectDetails[0].talentsExtraDetails.map(e => {
                    if (d._id.toString() === e.userId.toString()) {
                        d.city = e.city;
                        d.country = e.country;
                        d.timeZone = e.timeZone;
                        d.primaryRole = e.primaryRole;
                        d.yearsOfExperience = e.yearsOfExperience;
                        d.experienceOrder = e.experienceOrder;
                        d.verifiedProfile = e.verifiedProfile;
                    }
                });
            });
        }

        if (projectDetails && projectDetails.length) {
            delete projectDetails[0].talents;
            delete projectDetails[0].talentsExtraDetails;
            return projectDetails[0];
        } else {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Project'), 400);
        }
    }

    static async getAggregateParams (id, user) {
        let aggregateParams = [];
        switch (user.role) {
            case CONSTANTS.ROLE.CLIENT:
                aggregateParams = ProjectDetailsService.getClientAggregations(id, user);
                break;
            case CONSTANTS.ROLE.ADMIN:
                aggregateParams = ProjectDetailsService.getAdminAggregations(id);
                break;
            case CONSTANTS.ROLE.AGENCY:
                aggregateParams = await ProjectDetailsService.getAgencyAggregations(id, user._id);
                break;
            default:
                aggregateParams = ProjectDetailsService.getTalentAggregations(id, user);
                break;
        }
        return aggregateParams;
    }

    static getClientAggregations (id, user) {
        return [{
            $match: {
                _id: mongoose.Types.ObjectId(id),
                clientId: user._id
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$_id', '$$t.talentId'] } } },
                    {
                        $project: {
                            shortName: '$firstName',
                            email: 1,
                            profilePicture: 1
                        }
                    }
                ],
                as: 'talentsDetails'
            }
        }, {
            $lookup: {
                from: 'jobposts',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$projectId', '$$projectId'] } } },
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
                            expertise: 1,
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
                        $sort: { name: 1 }
                    }],
                as: 'briefs'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                isQuoteShow: { '$lt': ['$addedBy', null] },
                status: Utils.projectStatusCase(),
                talents: 1,
                talentsDetails: 1,
                briefs: 1
            }
        },
        {
            $lookup: {
                from: 'talents',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$userId', '$$t.talentId'] } } },
                    {
                        $project: {
                            tId: '$_id',
                            userId: 1,
                            primaryRole: 1,
                            ratePerHour: {
                                $sum: [CONSTANTS.FIXED_RATE, {
                                    $divide: [{
                                        $subtract: [
                                            { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                            {
                                                $mod: [
                                                    { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1]
                                            }
                                        ]
                                    }, 100]
                                }]
                            },
                            currency: 1,
                            city: 1,
                            country: 1,
                            timeZone: 1,
                            yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                            experienceOrder: 1,
                            verifiedProfile: 1
                        }
                    }],
                as: 'talentsExtraDetails'
            }
        }];
    }

    static getTalentAggregations (id, user) {
        return [{
            $match: {
                _id: mongoose.Types.ObjectId(id),
                'talents.talentId': user._id
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$_id', '$$t.talentId'] } } },
                    {
                        $project: {
                            name: { $concat: ['$firstName', ' ', { $toUpper: { $substr: [ '$lastName', 0, 1 ] } }, '.'] },
                            shortName:  '$firstName',
                            profilePicture: 1,
                            status: {
                                $reduce: {
                                    input: '$$t',
                                    initialValue: 0,
                                    in: {
                                        $cond: {
                                            if: { $eq: [ '$$this.talentId', '$_id' ] },
                                            then: '$$this.status',
                                            else: '$$value'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    { $match: { '$expr': { '$eq': ['$status', 1] } } },
                    { $project: { name: 1, shortName: 1, profilePicture: 1 } }
                ],
                as: 'talentsDetails'
            }
        },
        {
            $lookup: {
                from: 'talents',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$userId', '$$t.talentId'] } } },
                    {
                        $project: {
                            tId: '$_id',
                            userId: 1,
                            city: 1,
                            country: 1,
                            timeZone: 1,
                            primaryRole: 1,
                            yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                            experienceOrder: 1,
                            verifiedProfile: 1
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }],
                as: 'talentsExtraDetails'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                isQuoteShow: { '$gt': ['$_id', null] },
                status: Utils.projectStatusCase(),
                talentsDetails: 1,
                talentsExtraDetails: 1
            }
        },
        {
            $lookup: {
                from: 'jobposts',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$projectId', '$$projectId'] },
                        isArchived: false }
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
                            expertise: 1,
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
                        $sort: { name: 1 }
                    }],
                as: 'briefs'
            }
        },
        {
            $lookup: {
                from: 'quotes',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$projectId', '$$projectId'] } } },
                    {
                        $project: {
                            projectId: 1,
                            name: 1,
                            description: 1,
                            duration: 1,
                            quoteUrl: 1
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }],
                as: 'quotes'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                status: 1,
                talentsDetails: 1,
                isQuoteShow: 1,
                briefs: 1,
                quotes: 1,
                talentsExtraDetails: 1
            }
        }];
    }

    static getAdminAggregations (id) {
        return [{
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$_id', '$$t.talentId'] } } },
                    {
                        $project: {
                            name: { $concat: ['$firstName', ' ', '$lastName'] },
                            shortName:  '$firstName',
                            email: 1,
                            profilePicture: 1
                        }
                    }
                ],
                as: 'talentsDetails'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                isQuoteShow: { '$gt': ['$_id', null] },
                status: Utils.projectStatusCase(),
                talents: 1,
                talentsDetails: 1
            }
        },
        {
            $lookup: {
                from: 'talents',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$userId', '$$t.talentId'] } } },
                    {
                        $project: {
                            tId: '$_id',
                            userId: 1,
                            primaryRole: 1,
                            ratePerHour: 1,
                            currency: 1,
                            city: 1,
                            country: 1,
                            timeZone: 1,
                            yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                            experienceOrder: 1,
                            verifiedProfile: 1
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }],
                as: 'talentsExtraDetails'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'clientDetails'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$clientDetails', 0] }, '$$ROOT']
                }
            }
        }, {
            $lookup: {
                from: 'jobposts',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$projectId', '$$projectId'] } } },
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
                            expertise: 1,
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
                        $sort: { name: 1 }
                    }],
                as: 'briefs'
            }
        },
        {
            $lookup: {
                from: 'quotes',
                let: { projectId: '$_id' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$projectId', '$$projectId'] } } },
                    {
                        $project: {
                            projectId: 1,
                            name: 1,
                            description: 1,
                            duration: 1,
                            quoteUrl: 1
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }],
                as: 'quotes'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                clientName: { $concat: ['$firstName', ' ', '$lastName'] },
                clientEmail: '$email',
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                status: 1,
                talents: 1,
                talentsDetails: 1,
                addedBy: 1,
                isQuoteShow: 1,
                talentsExtraDetails: 1,
                briefs: 1,
                quotes: 1
            }
        }];
    }

    static async getAgencyAggregations (id, userId) {
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(userId);
        return [{
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [
                    {
                        $match: {
                            $and: [{
                                '$expr': { '$in': ['$_id', agencyTalentIds] }
                            }, {
                                '$expr': { '$in': ['$_id', '$$t.talentId'] }
                            }]
                        }
                    },
                    {
                        $project: {
                            name: { $concat: ['$firstName', ' ', '$lastName'] },
                            shortName:  '$firstName',
                            email: 1,
                            profilePicture: 1
                        }
                    }
                ],
                as: 'talentsDetails'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                isQuoteShow: { '$gt': ['$_id', null] },
                status: Utils.projectStatusCase(),
                talents: 1,
                talentsDetails: 1
            }
        },
        {
            $lookup: {
                from: 'talents',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$userId', '$$t.talentId'] } } },
                    {
                        $project: {
                            tId: '$_id',
                            userId: 1,
                            primaryRole: 1,
                            ratePerHour: 1,
                            currency: 1,
                            city: 1,
                            country: 1,
                            timeZone: 1,
                            yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                            experienceOrder: 1,
                            verifiedProfile: 1
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }],
                as: 'talentsExtraDetails'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'clientDetails'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$clientDetails', 0] }, '$$ROOT']
                }
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                startDate: 1,
                endDate: 1,
                clientId: 1,
                clientName: { $concat: ['$firstName', ' ', '$lastName'] },
                clientEmail: '$email',
                buildStatus: 1,
                lookingFor: 1,
                budget: 1,
                messageToPreSales: 1,
                speed: 1,
                teamManageType: 1,
                status: 1,
                talents: 1,
                talentsDetails: 1,
                addedBy: 1,
                isQuoteShow: 1,
                talentsExtraDetails: 1
            }
        }];
    }
}

module.exports = ProjectDetailsService;
