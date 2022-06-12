const Project = require('../../models/project.model');
const AgencyProjectListService = require('../agencyProjectList/agencyProjectListService');
const { roleWiseTalentCount } = require('../../util/utilFunctions');

/**
 * Class represents services for project talents role wise count
 */
class AgencyTalentsRoleWiseCountCountService {
    /**
     * @desc This function is being used to agency project talents role wise count
     * @author Innovify
     * @since 30/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(user._id);
        const query = [{
            $match: {
                'talents.talentId': { $in: agencyTalentIds }
            }
        },
        {
            $project: {
                talents: 1
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
        }];
        const commonQuery = roleWiseTalentCount();
        const finalQuery = [].concat(query, commonQuery);
        return await Project.aggregate(finalQuery);
    }
}

module.exports = AgencyTalentsRoleWiseCountCountService;
