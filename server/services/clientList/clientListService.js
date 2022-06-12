const Client = require('../../models/client.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for client list based in name search
 */
class ClientListService {
    /**
     * @desc This function is being used to get client list based status query
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req) {

        const options = {
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };
        const aggregateParams = Utils.getCommonUserSearchAggregateParams(req.query.status);

        aggregateParams.push({
            $project: {
                clientUserId: '$userId',
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                companyName: { $concat: ['$billing.companyDetails.name', ''] },
                status: Utils.getUserStatus()
            }
        });

        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams.push({
                $match: {
                    $or: [{
                        name: { $regex: query }
                    }, {
                        email: { $regex: query }
                    }, {
                        companyName: { $regex: query }
                    }] }
            });
        }

        const aggregate = Client.aggregate([aggregateParams]);
        return await Client.aggregatePaginate(aggregate, options);
    }
}

module.exports = ClientListService;
