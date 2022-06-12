const User = require('../../models/user.model');

/**
 * Class represents services for client list based in name search
 */
class ClientListService {
    /**
     * @desc This function is being used to get client list based in name search
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async searchByName (req) {
        const aggregateQuery = [{
            $match: {
                role: 2,
                isActive: 1
            }
        },
        {
            $lookup: {
                from: 'clients',
                localField: '_id',
                foreignField: 'userId',
                as: 'clients'
            }
        },
        {
            $addFields: {
                companyName: { $arrayElemAt: ['$clients.billing.companyDetails.name', 0] }
            }
        },
        {
            $match: { 'clients.signupStep': { $gte: CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING }, 'clients.isActive': 1 }
        }];
        if (req.query.companyName) {
            const companyNameQuery = new RegExp(req.query.companyName, 'i');
            aggregateQuery.push({
                $match: { companyName: { $regex: companyNameQuery } }
            });
        }
        aggregateQuery.push({
            $project: {
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                companyName: { $ifNull: ['$companyName', '' ] },
                email: '$email'
            }
        });

        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateQuery.push({
                $match: { $or: [{ name: { $regex: query } }, { email: { $regex: query } }] }
            });
        }
        aggregateQuery.push({ $sort: { name: 1 } });
        return await User.aggregate(aggregateQuery);
    }
}

module.exports = ClientListService;
