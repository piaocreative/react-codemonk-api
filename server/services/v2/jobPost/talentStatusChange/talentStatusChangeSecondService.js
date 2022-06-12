const JobPost = require('../../../../models/jobPost.model');
const Client = require('../../../../models/client.model');
const User = require('../../../../models/user.model');
const Email = require('../../../../util/sendEmail');
const {
    ROLE: { CLIENT },
    BRIEF: { TALENT: {
        STATUS: { HIRED, REJECTED }
    } }
} = require('../../../../util/constants');

/**
 * Class represents services for job post talent status change
 */
class TalentStatusChangeService {
    /**
     * @desc This function is being used to job post talent status change
     * @author CodeMonk
     * @since 16/02/2022
     * @param {Object} req Request
     * @param {String} req.body.jobPostId job post id
     * @param {String} req.body.talentId talent id
     * @param {Number} req.body.status status that needs to be change
     * @param {Object} user logged in user data
     */
    static async changeTalentStatus (jobPostId, talentUserId, status, role = '', clientUserId = undefined) {
        const where = {
            _id: jobPostId,
            'applications.talentId': talentUserId
        };

        if (role === CLIENT) {
            where.clientId = clientUserId;
        }
        await JobPost.updateOne(where, {
            $set: {
                'applications.$.status': status
            }
        });

        const jobPost = await JobPost.findOne(where);
        if (jobPost) {
            switch (status) {
                case HIRED:
                    // send new hiring request mail
                    await TalentStatusChangeService.sendTalentHiringRequestToHR(jobPost, talentUserId);
                    break;
                case REJECTED:
                    await TalentStatusChangeService.sendRejectEmailToTalent(jobPost, talentUserId);
                    break;
            }
        }
        return jobPost;
    }

    static async sendRejectEmailToTalent (jobPost, talentUserId) {
        const client = await Client.findOne({ userId: jobPost.clientId });
        let companyName = '';
        if (client && client.billing && client.billing.companyDetails && client.billing.companyDetails.name) {
            companyName = client.billing.companyDetails.name;
        }
        const jobTitle = jobPost.name;
        const talent = await User.findById(talentUserId, ['firstName', 'email']);
        const firstName = `${talent.firstName}`;
        const subject = `You have not been selected for ${jobTitle} role at ${companyName}`;
        const template = 'emailTemplates/talentRejected.html';
        const appUrl = process.env.FRONTEND_URL + '/talent';
        const templateVariables = {
            appUrl,
            firstName,
            jobTitle,
            companyName,
            actionUrl: appUrl + '/job-briefs'
        };
        await Email.prepareAndSendEmail([talent.email], subject, template, templateVariables);
    }

    static async sendTalentHiringRequestToHR (jobPost, talentUserId) {
        const client = await Client.findOne({ userId: jobPost.clientId });
        let companyName = '';
        if (client && client.billing && client.billing.companyDetails && client.billing.companyDetails.name) {
            companyName = client.billing.companyDetails.name;
        }
        const jobTitle = jobPost.name;
        const talent = await User.findById(talentUserId, ['firstName', 'email']);
        const firstName = `${talent.firstName}`;
        const subject = `${companyName} wants to hire ${firstName} for ${jobTitle} role.`;
        const template = 'emailTemplates/talentHiringRequest.html';
        const appUrl = process.env.FRONTEND_URL + '/talent';
        const templateVariables = {
            appUrl,
            talentName:firstName,
            jobTitle,
            companyName,
            actionUrl: appUrl + '/job-briefs'
        };
        await Email.prepareAndSendEmail(CONSTANTS.HR_EMAIL[process.env.NODE_ENV], subject, template, templateVariables);
    }
}

module.exports = TalentStatusChangeService;
