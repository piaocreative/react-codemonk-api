const Talent = require('../../models/talent.model');

/**
 * Class represents services for get talent roles counts
 */
class TalentRolesCountService {
    /**
     * @desc This function is being used to get talent roles counts
     * @author Innovify
     * @since 30/09/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async getTalentRolesCount () {
        const aggregateParams = [{
            $match: {
                isActive: 1,
                $or: [{
                    registerType: 'freelancer',
                    signupStep: { $gte: CONSTANTS.TALENT.ACTIVE_STATUS }
                },
                {
                    registerType: 'agency',
                    signupStep: { $gte: CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS }
                }],
                primaryRole: {
                    $exists: true,
                    $ne: null
                }
            }
        },
        {
            $group: {
                _id: '$primaryRole',
                count: {
                    $sum: 1
                }
            }
        }];

        const data = await Talent.aggregate(aggregateParams);
        return CONSTANTS.PRIMARY_ROLE.map(d => {
            let obj = {
                _id: d,
                count: 0
            };

            data.map(i => {
                if (i._id === d) {
                    obj = {
                        id: d,
                        count: i.count
                    };
                }
            });

            return obj;
        });
    }
}

module.exports = TalentRolesCountService;
