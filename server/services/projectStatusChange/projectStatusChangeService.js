const mongoose = require('mongoose');
const Project = require('../../models/project.model');
const ProjectStatusChangeValidator = require('./projectStatusChangeValidator');


/**
 * Class represents services for project status change
 */
class ProjectDetailsService {
    /**
     * @desc This function is being used to project status change
     * @author Innovify
     * @since 21/09/2020
     * @param {Object} req Request
     * @param {String} req.body.projectId params project id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, local) {
        const Validator = new ProjectStatusChangeValidator(req.body, local);
        await Validator.projectStatusChange();
        const where = {
            _id: mongoose.Types.ObjectId(req.body.projectId)
        };

        await Project.updateOne(where, {
            $set: {
                status: req.body.status
            }
        });

    }
}

module.exports = ProjectDetailsService;
