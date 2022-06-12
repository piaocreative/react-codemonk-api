const Project = require('../../models/project.model');
const AgencyProjectListService = require('../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for project talents count
 */
class AgencyTalentsCountService {
    /**
     * @desc This function is being used to agency project talents count
     * @author Innovify
     * @since 30/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(user._id);

        const count = await Project.aggregate([{
            $match: {
                'talents.talentId': { $in: agencyTalentIds }
            }
        },
        {
            $unwind: {
                path: '$talents'
            }
        },
        {
            $match: {
                'talents.talentId': { $in: agencyTalentIds }
            }
        },
        {
            $group: {
                _id: '$talents.talentId'
            }
        },
        {
            $group: {
                _id: null,
                count: {
                    $sum: 1
                }
            }
        }]);

        if (count && count.length) {
            return count[0].count;
        } else {
            return 0;
        }
    }
}

module.exports = AgencyTalentsCountService;
