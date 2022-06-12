const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for project list based on status
 */
class ProjectListService {
    /**
     * @desc This function is being used to get project based on status
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list(req) {
        const options = {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };
        const aggregateParams = [];
        if (req.query.status !== undefined) {
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
            $lookup: {
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'user'
            }
        });

        aggregateParams.push({
            $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] }
            }
        });
        aggregateParams.push({
            $lookup: {
                from: 'clients',
                localField: 'clientId',
                foreignField: 'userId',
                as: 'clients'
            }
        },
            {
                $addFields: {
                    companyName: { $arrayElemAt: ['$clients.billing.companyDetails.name', 0] }
                }
            });

        aggregateParams.push({
            $project: {
                startDate: 1,
                endDate: 1,
                name: 1,
                clientId: '$clients._id',
                clientName: { $concat: ['$firstName', ' ', '$lastName'] },
                companyName: 1,
                status: Utils.projectStatusCase()
            }
        });


        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams.push({
                $match: {
                    $or: [{
                        clientName: { $regex: query }
                    },
                    {
                        companyName: { $regex: query }
                    },
                    {
                        name: { $regex: query }
                    }]
                }
            });
        }

        const aggregate = Project.aggregate([aggregateParams]);
        return await Project.aggregatePaginate(aggregate, options);
    }
}

module.exports = ProjectListService;
