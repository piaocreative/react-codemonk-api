const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');
const SortParser = require('sort-parser');
const sp = new SortParser(
    { format: SortParser.mongodb,
        fields: ['_id', 'name'],
        strict: true
    });
/**
 * Class represents services for project list based on status
 */
class ClientProjectListService {
    /**
     * @desc This function is being used to client project list
     * @author Innovify
     * @since 08/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async clientProjects (req, user) {
        const options = {
            sort: this.sortData(req.query),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };
        const aggregateParams = [
            {
                $match: {
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
                                name: { $concat: ['$firstName', ' ', '$lastName'] },
                                shortName: '$firstName',
                                profilePicture: 1
                            }
                        }
                    ],
                    as: 'talentsDetails'
                }
            }
        ];

        if (req.query.status !== undefined && parseInt(req.query.status) !== -1) {
            const statusArr = req.query.status.split(',').filter(s => !isNaN(s) && parseInt(s) >= 0 ).map(s => parseInt(s))
            if (statusArr.length > 0) {
                aggregateParams.push({
                    $match: {
                        status: {
                            $in: statusArr
                        }
                    }
                });
            }
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
        let sort = { '_id': -1 };
        if (queryParam.sort) {
            try {
                sort = sp(queryParam.sort);
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return sort;
    }
}

module.exports = ClientProjectListService;
