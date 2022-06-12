const User = require('../../models/user.model');

/**
 * Class represents services for talent list based in name search
 */
class UnregisteredUserService {
    /**
     * @desc This function is being used to get talent list based in name search
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async searchByEmail (req, user, local) {
        if (!req.query.email) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Filter'), 400);
        }
        const primaryCondition = {
            role: 1,
            isActive: 0,
            email: req.query.email
        };
        return User.aggregate([
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
                    'talents.signupStep': { $exists: false },
                    'talents.isActive': 1
                }
            },
            { $project: { email: '$email' } }
        ]);
    }
}

module.exports = UnregisteredUserService;
