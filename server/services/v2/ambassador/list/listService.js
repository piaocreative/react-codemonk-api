const Ambassador = require('../../../../models/ambassador.model');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents services for ambassador list based in name search
 */
class ListService {
    /**
     * @desc This function is being used to get ambassador list based status query
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req) {

        const options = {
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };
        const aggregateParams = Utils.getCommonUserSearchAggregateParams(req.query.status, false, false, true);

        aggregateParams.push({
            $project: {
                ambassadorUserId: '$userId',
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                companyName: { $concat: ['$billing.companyDetails.name', ''] },
                status: Utils.getUserStatusForAmbassador()
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

        const aggregate = Ambassador.aggregate([aggregateParams]);
        return await Ambassador.aggregatePaginate(aggregate, options);
    }
}

module.exports = ListService;
