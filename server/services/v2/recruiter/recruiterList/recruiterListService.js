const Recruiter = require('../../../../models/recruiter.model');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents services for recruiter list based in name search
 */
class RecruiterListService {
    /**
     * @desc This function is being used to get recruiter list based status query
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
        const aggregateParams = Utils.getCommonUserSearchAggregateParams(req.query.status,false, true);

        aggregateParams.push({
            $project: {
                recruiterUserId: '$userId',
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                companyName: { $concat: ['$billing.companyDetails.name', ''] },
                status: Utils.getUserStatusForRecruiter()
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

        const aggregate = Recruiter.aggregate([aggregateParams]);
        return await Recruiter.aggregatePaginate(aggregate, options);
    }
}

module.exports = RecruiterListService;
