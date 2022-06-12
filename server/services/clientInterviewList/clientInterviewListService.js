const Interview = require('../../models/interview.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for client interview list based on status
 */
class ClientInterviewListService {
    /**
     * @desc This function is being used to client interview list
     * @author Innovify
     * @since 08/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async list (req, user) {
        const options = {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };

        const aggregateParams = Utils.getInterviewAggregateParams();
        aggregateParams.unshift({
            $match: {
                clientId: user._id
            }
        });

        if (req.query.status !== undefined && req.query.status !== -1) {
            aggregateParams[0].$match.status = parseInt(req.query.status);
        }

        const aggregate = Interview.aggregate([aggregateParams]);
        return await Interview.aggregatePaginate(aggregate, options);
    }
}

module.exports = ClientInterviewListService;
