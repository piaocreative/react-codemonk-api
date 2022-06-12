const Project = require('../../models/project.model');

/**
 * Class represents services for project talents count
 */
class ClientTalentsCountService {
    /**
     * @desc This function is being used to client project talents count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        const count = await Project.aggregate([{
            $match: {
                clientId: user._id
            }
        },
        {
            $unwind: {
                path: '$talents'
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

module.exports = ClientTalentsCountService;
