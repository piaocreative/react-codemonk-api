const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');
/**
 * Class represents services for projects count
 */
class ClientProjectsCountService {
    /**
     * @desc This function is being used to client projects count
     * @author Innovify
     * @since 29/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async count (req, user) {
        return {
            all: await Project.countDocuments({
                clientId: user._id
            }),
            active: await Project.countDocuments({
                clientId: user._id,
                status: { $in: Utils.getProjectsActiveStatus() }
            })
        };
    }
}

module.exports = ClientProjectsCountService;
