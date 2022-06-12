const Interview = require('../../models/interview.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for admin interview list based on status
 */
class AdminInterviewListService {
    /**
     * @desc This function is being used to admin interview list
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async list (req) {
        const options = {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };

        const aggregateParams = Utils.getInterviewAggregateParams();
        if (req.query.status !== undefined && req.query.status !== -1) {
            aggregateParams.unshift({
                $match: {
                    status: parseInt(req.query.status)
                }
            });
        }
        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams.push({
                $match: {
                    $or: [
                        { name: { $regex: query } },
                        { clientName: { $regex: query } },
                        { companyName: { $regex: query } },
                        { talentName: { $regex: query } }
                    ] }
            });
        }
        const aggregate = Interview.aggregate([aggregateParams]);
        return await Interview.aggregatePaginate(aggregate, options);
    }
}

module.exports = AdminInterviewListService;
