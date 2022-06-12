const Talent = require('../../models/talent.model');

/**
 * Class represents services for talent count country wise
 */
class TalentCountryWiseService {
    /**
     * @desc This function is being used get talent count country wise
     * @author Innovify
     * @since 02/12/2020
     */
    static async talentCount() {
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
                }]
            }
        },
        {
            $group: {
                _id: '$country',
                count: {
                    $sum: 1
                }
            }
        }];
        return await Talent.aggregate(aggregateParams);
    }
}

module.exports = TalentCountryWiseService;
