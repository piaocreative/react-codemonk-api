const Project = require('../../models/project.model');
const { ROLE: { CLIENT } } = require('../../util/constants');

/**
 * Class represents services for project list based on status
 */
class ClientProjectSearchByNameService {
    /**
     * @desc This function is being used to client project list based on search query
     * @author Innovify
     * @since 01/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} user logged in user data
     */
    static async clientProjectSearchByName (req, user) {
        const query = {};
        if (user.role === CLIENT) {
            query.clientId = user._id;
        }

        if (req.query.q) {
            query.name = new RegExp(req.query.q, 'i');
        }

        return await Project.find(query, { name: 1, description: 1 });
    }
}

module.exports = ClientProjectSearchByNameService;
