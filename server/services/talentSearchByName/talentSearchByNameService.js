const User = require('../../models/user.model');
const { ROLE: { AGENCY, CLIENT } } = require('../../util/constants');
const { getAgencyTalentsUserIds } = require('../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for talent list based in name search
 */
class TalentListService {
    /**
     * @desc This function is being used to get talent list based in name search
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async searchByName(req, user, local) {
        if (!req.query.q) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Filter'), 400);
        }
        const query = new RegExp(req.query.q, 'i');
        const primaryCondition = {
            role: 1,
            isActive: 1,
            isDelete: 0
        };
        if (user.role === AGENCY) {
            const userIds = await getAgencyTalentsUserIds(user._id);
            primaryCondition._id = {
                $in: userIds
            };
        }

        const aggregate = [
            {
                $match: primaryCondition
            },
            {
                $lookup: {
                    from: 'talents',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'talents'
                }
            },
            {
                $match: {
                    $or: [{
                        'talents.registerType': 'freelancer',
                        'talents.signupStep': { $gte: CONSTANTS.TALENT.ACTIVE_STATUS }
                    },
                    {
                        'talents.registerType': 'agency',
                        'talents.signupStep': { $gte: CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS }
                    }],
                    'talents.isActive': 1
                }
            },
            { $project: { name: { $concat: ['$firstName', ' ', '$lastName'] }, email: '$email', talent: { $arrayElemAt: ['$talents', 0] } } },


        ];
        if (user.role === AGENCY) {
            aggregate.push({ $project: { name: 1, email: 1, currency: '$talent.currency', ratePerHour: '$talent.ratePerHour', ratePerDay: '$talent.ratePerDay' } });
        } else if (user.role === CLIENT) {
            aggregate.push({ $project: { name: 1 } });
        } else {
            aggregate.push({ $project: { name: 1, email: 1 } });
        }
        aggregate.push({ $match: { $or: [{ name: { $regex: query } }, { email: { $regex: query } }] } });
        aggregate.push({ $sort: { name: 1 } });

        return User.aggregate(aggregate);
    }
}

module.exports = TalentListService;
