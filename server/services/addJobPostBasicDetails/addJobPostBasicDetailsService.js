const JobPost = require('../../models/jobPost.model');
const AddJobPostBasicDetailsValidator = require('./addJobPostBasicDetailsValidator');
const Utils = require('../../util/utilFunctions');
const { findOrCreateProjectByNameAndClient } = require('../addProject/addProjectService');
const { ROLE: { ADMIN } } = require('../../util/constants');
const moment = require('moment');
const AutoGeneratorService = require('../autoGenerator/autoGeneratorService');
class AddJobPostBasicDetailsService {

    static async addJobPostBasicDetails(req, user, local) {
        const Validator = new AddJobPostBasicDetailsValidator(req.body, local);
        await Validator.addJobPostBasicDetails();
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
        const jobPost = Utils.prepareJobPostBasicDetailsObject(req.body);
        jobPost.projectId = projectId;
        jobPost.status = CONSTANTS.BRIEF.STATUS.INACTIVE;
        jobPost.step = CONSTANTS.BRIEF.STEP.BASIC_DETAILS;

        jobPost.addedBy = user._id;
        jobPost.clientId = clientId;

        let autoCount = await AutoGeneratorService.nextAutoGenerateNumber('job-post');
        autoCount = autoCount + '';
        jobPost.jobId = autoCount + moment().format('YYMMDD');
        const result = await JobPost.create(jobPost);

        return result;
    }
}

module.exports = AddJobPostBasicDetailsService;
