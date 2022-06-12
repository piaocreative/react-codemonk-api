const mongoose = require('mongoose');
const JobPost = require('../../../models/jobPost.model');
const JobPostApplyValidator = require('./jobPostApplyValidator');
const Utils = require('../../../util/utilFunctions');
const Email = require('../../../util/sendEmail');
const Client = require('../../../models/client.model');
const User = require('../../../models/user.model');
const SendNotification = require('../../../util/sendNotification');

/**
 * Class represents services for agency profile save
 */
class JobPostApplyService {

    /**
     * @desc This function is being used to apply job post by talent
     * @author CodeMonk
     * @since 23/11/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async apply (req, user, local) {
        const Validator = new JobPostApplyValidator(req.body, local);
        await Validator.applyJobPost();

        const jobPost = await JobPost.findOne({
            _id: mongoose.Types.ObjectId(req.body.jobPostId),
            'applications.talentId': user._id
        }, {
            _id: 1
        }).lean();

        if (jobPost) {
            throw new CodeMonkError(local('TALENT_ALREADY_APPLIED'), 400);
        }

        const jobPostUpdated = await JobPost.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.body.jobPostId)
        }, {
            $addToSet: {
                applications: {
                    talentId: user._id,
                    status: 1,
                    notesOfMotivation: req.body.notesOfMotivation,
                    availableJoiningDate: Utils.getDateFromDDMMYYY(req.body.availableJoiningDate)
                }
            }
        }, { new: true });
        try {
            req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.BRIEF_APPLY;
            req.body.clientId = jobPostUpdated.clientId;
            req.body.jobId = jobPostUpdated.jobId;
            req.body.role = jobPostUpdated.role;
            req.body.talentId = user._id;
            await SendNotification.sendNotification(req, user, local);
            await this.sendEmailToTalent(user, req.body.jobPostId, jobPostUpdated);
            await this.sendEmailToClient(user, jobPostUpdated, req.body.notesOfMotivation, Utils.getDateFromDDMMYYY(req.body.availableJoiningDate));
        } catch (error) {
            CONSOLE_LOGGER.error(error);
        }
    }

    static async sendEmailToTalent (talent, jobBriefId, jobPost) {
        const client = await Client.findOne({ userId: jobPost.clientId });
        const role = (jobPost.role ? jobPost.role : '');
        const jobId = (jobPost.jobId ? jobPost.jobId : '');
        const companyName = (client.billing && client.billing.companyDetails
             && client.billing.companyDetails.name ? client.billing.companyDetails.name : '');
        const talentFirstName = `${talent.firstName}`;
        const talentLastName = talent.lastName ? talent.lastName.charAt(0).toUpperCase() : '';
        const talentName = `${talent.firstName} ${talent.lastName}`;
        const subject = `Successful Application: ${role} with ${jobId} at ${companyName}`;
        const template = 'emailTemplates/succeedApplyOnJobByTalent.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        const templateVariables = {
            jobRole: role,
            jobId,
            companyName,
            talentFirstName,
            firstLetterLastName: talentLastName,
            talentName,
            appUrl,
            actionUrl: `${appUrl}/brief-detail/${jobBriefId}`
        };
        await Email.prepareAndSendEmail([talent.email], subject, template, templateVariables);
    }

    static async sendEmailToClient (talent, jobPost, motivation, startDate) {
        const client = await Client.findOne({ userId: jobPost.clientId });
        const userClient = await User.findOne({ _id: client.userId });
        const role = (jobPost.role ? jobPost.role : '');
        const jobId = (jobPost.jobId ? jobPost.jobId : '');
        const talentFirstName = `${talent.firstName}`;
        const clientName = `${userClient.firstName} ${userClient.lastName}`;

        const subject = `New Application for ${role} with ${jobId}`;
        const template = 'emailTemplates/succeedApplyOnJobByTalentToClient.html';
        const appUrl = process.env.FRONTEND_URL + '/client';

        const templateVariables = {
            qualityAnalyst: role,
            talentFirstName,
            clientName,
            appUrl,
            actionUrl: `${appUrl}/talent-profile/${talent._id}`,
            motivation,
            startDate
        };
        await Email.prepareAndSendEmail([userClient.email], subject, template, templateVariables);
    }


}

module.exports = JobPostApplyService;
