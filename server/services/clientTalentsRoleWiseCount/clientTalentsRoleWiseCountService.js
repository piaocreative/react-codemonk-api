const Project = require('../../models/project.model');
const { roleWiseTalentCount } = require('../../util/utilFunctions');

/**
 * Class represents services for project talents role wise count
 */
class ClientTalentsRoleWiseCountCountService {
    /**
     * @desc This function is being used to client project talents role wise count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        const query = [{
            $match: {
                clientId: user._id
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
        }];
        const commonQuery = roleWiseTalentCount();
        const finalQuery = [].concat(query, commonQuery);
        return await Project.aggregate(finalQuery);
    }
}

module.exports = ClientTalentsRoleWiseCountCountService;
