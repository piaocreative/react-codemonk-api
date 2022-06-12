const JobPost = require('../../models/jobPost.model');
const AddJobPostValidator = require('./addJobPostValidator');
const Utils = require('../../util/utilFunctions');
const VisitHistory = require('../../models/visitHistory.model');
const { findOrCreateProjectByName } = require('../addProject/addProjectService');
const { addSkill } = require('../skills/skillServices');
const { ROLE: { ADMIN } } = require('../../util/constants');
const SendNotification = require('../../util/sendNotification');
const AddNotificationController = require('../../services/addNotification/addNotificationController');
const HubSpot = require('../hubSpot/hubSpot');

/**
 * Class represents services for admin add job post details.
 */
class AddJobPostService {

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async addJobPost (req, user, local) {
        const Validator = new AddJobPostValidator(req.body, local);
        await Validator.addJobPost();
        const name = req.body.projectName;
        const description = req.body.projectDescription;
        const clientId = user.role === ADMIN ? req.body.clientId : user._id;
        if (!clientId) {
            throw new CodeMonkError(local('NOT_FOUND', 'Client'), 400);
        }
        const projectId = await findOrCreateProjectByName(clientId, name, description);
        if (projectId.toString() !== name) {
            Validator.projectDescription(description);
        }
        const jobPost = Utils.prepareJobPostObject(req.body);
        jobPost.projectId = projectId;
        jobPost.status = 1;
        jobPost.addedBy = user._id;
        jobPost.clientId = clientId;
        const result = await JobPost.create(jobPost);
        await VisitHistory.updateOne({
        }, {
            briefId: result,
            briefPublishedDate: result.updatedAt
        }, {
            upsert: true
        });
        req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.BRIEF_ADDED;
        req.body.jobPostId = result._id;

        // Set hubspot contact action, don't wait.
        HubSpot.updateContact(user, {
            'posted': true,
            'latest_job_brief_posted': `${ jobPost.name } ${ jobPost.description }`
        });

        await SendNotification.sendNotification(req, user, local);

        addSkill(jobPost.skills);
        return result;
    }
}

module.exports = AddJobPostService;
