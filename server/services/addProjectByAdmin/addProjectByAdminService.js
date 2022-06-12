const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Project = require('../../models/project.model');
const AddProjectByAdminValidator = require('./addProjectByAdminValidator');
const Utils = require('../../util/utilFunctions');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services for add project by admin.
 */
class AddProjectByAdminService {

    /**
     * @desc This function is being used to add project details by admin
     * @author Innovify
     * @since 17/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addProjectByAdmin (req, user, local) {
        const Validator = new AddProjectByAdminValidator(req.body, local);
        await Validator.AddProjectByAdmin();
        const clientId = mongoose.Types.ObjectId(req.body.clientId);

        const isClientEligible = await User.findOne({
            _id: clientId,
            isActive: 1,
            role: 2
        }, { _id: 1 }).lean();

        if (isClientEligible) {
            const name = req.body.name;
            const isProjectExists = await Project.findOne({
                clientId,
                name
            });
            if (!isProjectExists) {
                const description = req.body.description;
                const project = {
                    clientId,
                    name,
                    description,
                    startDate: Utils.getDateFromDDMMYYY(req.body.startDate),
                    endDate: Utils.getDateFromDDMMYYY(req.body.endDate),
                    status: req.body.status,
                    addedBy: user._id,
                    teamPreference: req.body.teamPreference
                };
                await Project.create(project);
            } else {
                throw new CodeMonkError(local('PROJECT_EXISTS'), 400);
            }
        } else {
            throw new CodeMonkError(local('INVALID_CLIENT'), 400);
        }
    }
}

module.exports = AddProjectByAdminService;
