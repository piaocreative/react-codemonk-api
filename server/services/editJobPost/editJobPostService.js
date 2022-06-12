const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const User = require('../../models/user.model');
const Client = require('../../models/client.model');
const Project = require('../../models/project.model');
const EditJobPostValidator = require('./editJobPostValidator');
const Utils = require('../../util/utilFunctions');
const { ROLE: { CLIENT },BRIEF :{ TALENT : {STATUS : {HIRED, REJECTED}}} } = require('../../util/constants');
const { addSkill } = require('../skills/skillServices');
const Email = require('../../util/sendEmail');

/**
 * Class represents services for admin edit job post details.
 */
class EditJobPostService {

    /**
     * @desc This function is being used to edit admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async editJobPost(req, local) {
        const Validator = new EditJobPostValidator(req.body, local);
        await Validator.editJobPost();
        const jobPost = Utils.prepareJobPostObject(req.body, local);
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });
        addSkill(jobPost.skills);

    }

    /**
     * @desc This function is being used to archive job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async archiveJobPost(req, user) {
        const condition = {
            _id: mongoose.Types.ObjectId(req.params.id)
        };
        if (user.role === CLIENT) {
            condition.clientId = user._id;
        }
        const updated = await JobPost.updateOne(condition, {
            $set: { isArchived: true, archivedDate: Date.now() }
        });
        this.sendEmails(req.params.id);
        return updated;
    }

    static async editJobPostClient(req) {
        await JobPost.updateMany({
            projectId: mongoose.Types.ObjectId(req.body.projectId)
        }, {
            $set: { clientId: mongoose.Types.ObjectId(req.body.clientId) }
        });
    }

    static async sendEmails(jobBriefId) {
        const jobPost = await JobPost.findById(jobBriefId, ['name', 'applications', 'clientId', 'projectId']);
        const client = await Client.findOne({ userId: jobPost.clientId });
        let companyName = "";
        if (client.billing && client.billing.companyDetails && client.billing.companyDetails.name) {
            companyName = client.billing.companyDetails.name;
        }
        const jobTitle = jobPost.name;
        if (jobPost.applications.length > 0) {
            for (let i = 0; i < jobPost.applications.length; i++) {
                if (![HIRED, REJECTED].includes(jobPost.applications[i].status)) {
                    await this.sendEmail(jobPost.applications[i].talentId, jobTitle, companyName)
                }
            }
        }
    }

    static async sendEmail(talentId, jobTitle, companyName) {
        const talent = await User.findById(talentId, ['firstName', 'email']);
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
}

module.exports = EditJobPostService;
