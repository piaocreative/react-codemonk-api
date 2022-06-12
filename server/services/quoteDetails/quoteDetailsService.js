const mongoose = require('mongoose');
const Quote = require('../../models/quote.model');

/**
 * Class represents services for get quote details based on it's id
 */
class QuoteDetailsService {
    /**
     * @desc This function is being used to get quote details based on it's id
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {String} req.params params Quote id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details(req, user, local) {
        const aggregateParams = [{
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project: {
                projectId: {
                    $toObjectId: "$projectId"
                },
                name: 1,
                description: 1,
                quoteUrl: 1,
                isApplied: {
                    $cond: {
                        if: { $in: [user._id, '$agencies.agencyId'] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            "$lookup": {
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'projects'
            }
        }
            , { $addFields: { project: { $arrayElemAt: ["$projects", 0] } } }
            , { $addFields: { projectName: "$project.name" } }
            , { $project: { "projects": 0, "project": 0 } }
        ];

        const quote = await Quote.aggregate(aggregateParams);

        if (quote.length) {
            return quote[0];
        } else {
            throw new CodeMonkError(local('NOT_FOUND', 'Quote'), 400);
        }
    }
}

module.exports = QuoteDetailsService;
