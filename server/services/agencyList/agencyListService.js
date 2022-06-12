const Agency = require('../../models/agency.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency list based in name search
 */
class AgencyListService {
    /**
     * @desc This function is being used to get agency list based status query
     * @author Innovify
     * @since 03/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req) {

        const options = {
            sort: { 'name': 1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true

        };
        const aggregateParams = Utils.getCommonUserSearchAggregateParams(req.query.status);

        aggregateParams.push({
            $project: {
                agencyUserId: '$userId',
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                agencyName: { $concat: ['$agency.name', ''] },
                status: Utils.getUserStatus()
            }
        });

        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams.push({ $match: { $or: [{ name: { $regex: query } }, { email: { $regex: query } }] } });
        }

        const aggregate = Agency.aggregate([aggregateParams]);
        return await Agency.aggregatePaginate(aggregate, options);
    }
}

module.exports = AgencyListService;
