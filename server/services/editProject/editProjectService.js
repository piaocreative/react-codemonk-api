const Project = require('../../models/project.model');
const CodeMonkError = require('../../util/CodeMonkError');
const EditProjectValidator = require('./editProjectValidator');
const EditJobPostService = require('../editJobPost/editJobPostService');

/**
 * Class represents services for client edit project details.
 */
class EditProjectService {

    /**
     * @desc This function is being used to edit client project details
     * @author Innovify
     * @since 12/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async editProject(req, user, local) {
        const Validator = new EditProjectValidator(req.body, local);
        await Validator.editProject();
        const name = req.body.name;
        const projectId = await Validator.checkId(req.body.projectId, 'Project');
        const project = await Project.findById(projectId);
        const oldClientId = project.clientId
        if (!project) {
            throw new CodeMonkError(local('NOT_FOUND', 'Project'), 400);
        }
        project.name = name;
        project.description = req.body.description;
        if (user.role === CONSTANTS.ROLE.ADMIN) {
            await EditProjectService.adminUpdate(project, Validator, req);
        } else if (project.clientId.toString() === user._id.toString()) {
            project.clientId = user._id;
        } else {
            throw new CodeMonkError(local('NOT_FOUND', 'Project'), 400);
        }
        await EditProjectService.checkProjectExisted(project.clientId, name, project._id, local);
        const editedProject = await project.save();

        if (user.role === CONSTANTS.ROLE.ADMIN && oldClientId.toString() !== req.body.clientId.toString()) {
            await EditJobPostService.editJobPostClient(req)
        }
        return editedProject;
    }

    static async adminUpdate(project, Validator, req) {
        await this.changeProjectClient(project, req.body.clientId);
        project.clientId = await Validator.checkId(req.body.clientId);
        const startDate = Validator.checkDate(req.body.startDate);
        if (startDate) {
            project.startDate = startDate;
        }
        const endDate = Validator.checkDate(req.body.endDate);
        if (endDate) {
            project.endDate = endDate;
        }

        Validator.status(req.body.status);
        if (req.body.status) {
            project.status = req.body.status;
        }
    }

    /**
     * @desc This function is being used to check that same project is existing for same client
     * @author Innovify
     * @since 12/10/2020
     * @param {strong} userId client id
     * @param {String} name name of the project
     * @param {String} projectId project id that needs to be exclude from edit rule
     */
    static async checkProjectExisted(userId, name, projectId, local) {
        const isProjectExists = await Project.findOne({
            _id: { $ne: projectId },
            clientId: userId,
            name
        });

        if (isProjectExists) {
            throw new CodeMonkError(local('PROJECT_EXISTS_CLIENT'), 400);
        }
    }

    static async changeProjectClient(project, clientId) {
        if (project.clientId.toString() !== clientId.toString()) {
            return;
        }
    }
}

module.exports = EditProjectService;
