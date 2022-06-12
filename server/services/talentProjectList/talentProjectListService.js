const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');
const { ROLE: { AGENCY } } = require('../../util/constants');
const { Types: { ObjectId } } = require('mongoose');
const { getAgencyTalentsUserIds } = require('../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for talent project list based on status
 */
class TalentProjectListService {
    /**
     * @desc This function is being used to get talent project list based on status
     * @author Innovify
     * @since 22/10/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list (req, user) {
        const options = {
            select: {
                _id: 1,
                name: 1,
                status: 1
            },
            sort: this.sortData(req.query),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };

        const aggregateParams = [{
            $match: {
                'talents.talentId': user._id
            }
        }, {
            $lookup: {
                from: 'users',
                let: { t: '$talents' },
                pipeline: [
                    { $match: { '$expr': { '$in': ['$_id', '$$t.talentId'] } } },
                    {
                        $project: {
                            name: { $concat: ['$firstName', ' ', { $toUpper: { $substr: [ '$lastName', 0, 1 ] } }, '.' ] },
                            shortName: '$firstName',
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
        }];

        if (req.query.status !== undefined && parseInt(req.query.status) !== -1) {
            aggregateParams[0].$match.status = parseInt(req.query.status);
        }

        aggregateParams.push({
            $project: {
                name: 1,
                talentsDetails: 1,
                description: 1,
                status: Utils.projectStatusCase()
            }
        });

        const aggregate = Project.aggregate([aggregateParams]);
        return await Project.aggregatePaginate(aggregate, options);
    }

    static sortData (queryParam) {
        let sort = { 'talents._id': -1 };
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

    /**
     * @desc This function is being used to get talent project list based on status
     * @author Innovify
     * @since 22/10/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async names (req, user) {
        let talentId = user._id;
        if (user.role === AGENCY) {
            if (req.query.talentId) {
                talentId = ObjectId(req.query.talentId);
            } else {
                const userIds = await getAgencyTalentsUserIds(user._id);
                talentId = { $in: userIds };
            }
        }
        const query = {
            talents: {
                $elemMatch: {
                    talentId,
                    status: 1
                }
            }
        };

        if (req.query.q) {
            query.name = new RegExp(req.query.q, 'i');
        }
        return await Project.find(query, { name: 1, description: 1 });
    }
}

module.exports = TalentProjectListService;
