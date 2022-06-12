const Project = require('../../models/project.model');
const AgencyProjectListService = require('../agencyProjectList/agencyProjectListService');

/**
 * Class represents services for projects count
 */
class AgencyProjectsCountService {
    /**
     * @desc This function is being used to Agency projects count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        const agencyTalentIds = await AgencyProjectListService.getAgencyTalentsUserIds(user._id);
        return Project.countDocuments({
            'talents.talentId': { $in: agencyTalentIds }
        });
    }
}

module.exports = AgencyProjectsCountService;
