const Project = require('../../models/project.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency project list based on status
 */
class AgencyProjectListService {
    /**
     * @desc This function is being used to get agency project list based on status
     * @author Innovify
     * @since 28/10/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list (req, user) {
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(user._id);

        const options = {
            select: {
                _id: 1,
                name: 1,
                talents: 1,
                status: 1
            },
            sort: { 'talents._id': -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };

        const aggregateParams = [{
            $match: {
                'talents.talentId': { $in: agencyTalentIds }
            }
        }];

        if (req.query.status !== undefined && parseInt(req.query.status) !== -1) {
            aggregateParams[0].$match.status = parseInt(req.query.status);
        }

        aggregateParams.push({
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [{
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
                        profilePicture: '$profilePicture'
                    }
                }],
                as: 'talentsUserDetails'
            }
        }, {
            $project: {
                name: 1,
                talentsUserDetails: 1,
                status: Utils.projectStatusCase()
            }
        });

        const aggregate = Project.aggregate([aggregateParams]);
        return await Project.aggregatePaginate(aggregate, options);
    }

    /**
     * @desc This function is being used to get agency talents user ids
     * @author Innovify
     * @since 28/10/2020
     * @param {ObjectId} agencyId agencyId
     */
    static async getAgencyTalentsUserIds (agencyId) {
        const talentUserDetails = await AgencyTalent.aggregate([{
            $match: {
                agencyId
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [{
                    $match: { '$expr': { '$in': ['$email', '$$t.email'] } }
                },
                {
                    $project: {
                        _id: 1
                    }
                }],
                as: 'talentsUserDetails'
            }
        }, {
            $project: {
                talentsUserDetails: 1
            }
        }]);

        const hasDetails = talentUserDetails.length && talentUserDetails[0].talentsUserDetails.length;

        return hasDetails ? talentUserDetails[0].talentsUserDetails.map(d => {
            return d._id;
        }) : [];
    }
}

module.exports = AgencyProjectListService;
