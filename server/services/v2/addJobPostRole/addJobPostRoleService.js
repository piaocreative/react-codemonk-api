const JobPost = require('../../../models/jobPost.model');
const AddJobPostRoleValidator = require('./addJobPostRoleValidator');
const Utils = require('../../../util/utilFunctions');
const { findOrCreateProjectByNameAndClient } = require('../../addProject/addProjectService');
const { ROLE: { ADMIN } } = require('../../../util/constants');
const moment = require('moment');
const AutoGeneratorService = require('../../autoGenerator/autoGeneratorService');
const HubSpot = require('../../hubSpot/hubSpot');
class AddJobPostRoleService {

    static async addJobPostRole (req, user, local) {
        const Validator = new AddJobPostRoleValidator(req.body, local);
        await Validator.addJobPostRole();
        const name = req.body.projectName;
        const description = req.body.projectDescription;
        const clientId = user.role === ADMIN ? req.body.clientId : user._id;
        if (!clientId) {
            throw new CodeMonkError(local('NOT_FOUND', 'Client'), 400);
        }
        const projectId = await findOrCreateProjectByNameAndClient(clientId, name, description);
        if (projectId.toString() !== name) {
            Validator.projectDescription(description);
        }
        const jobPost = Utils.prepareJobPostRoleObject(req.body);
        jobPost.projectId = projectId;
        jobPost.status = CONSTANTS.BRIEF.STATUS.INACTIVE;
        jobPost.step = CONSTANTS.BRIEF.STEP.ROLE;

        jobPost.addedBy = user._id;
        jobPost.clientId = clientId;

        let autoCount = await AutoGeneratorService.nextAutoGenerateNumber('job-post');
        autoCount = autoCount + '';
        jobPost.jobId = autoCount + moment().format('YYMMDD');
        const result = await JobPost.create(jobPost);

        // Set hubspot contact action, don't wait.
        HubSpot.updateContact(user, {
            'posted': true,
            'latest_job_brief_posted': `${ jobPost.name } ${ jobPost.description }`
        });

        return result;
    }
}

module.exports = AddJobPostRoleService;
