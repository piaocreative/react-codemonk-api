const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const AddJobPostPreferredCandidatesValidator = require('./addJobPostPreferredCandidatesValidator');
const VisitHistory = require('../../models/visitHistory.model');
const AddJobPostPreferredCandidateDTO = require('./dto/addJobPostPreferredCandidateDTO');
const SendNotification = require('../../util/sendNotification');
const { addSkill } = require('../skills/skillServices');
const { getRecommandedCandidatesFromJobRoleWithPage } = require('../algoProxyServer/algoServerService');
const Email = require('../../util/sendEmail');
const currency = require('../../util/currency');

class AddJobPostPreferredCandidatesService {

    static async addJobPostPreferredCandidates(req, user, local) {
        const Validator = new AddJobPostPreferredCandidatesValidator(req.body, local);
        await Validator.addJobPostPreferredCandidates();
        let jobPost = AddJobPostPreferredCandidateDTO.prepareObject(req.body);
        jobPost.status = CONSTANTS.BRIEF.STATUS.ACTIVE;
        jobPost.step = CONSTANTS.BRIEF.STEP.PREFERRED_CANDIDATES;
        jobPost.updatedBy = user._id;
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        await VisitHistory.updateOne({
        }, {
            briefId: mongoose.Types.ObjectId(req.body.id),
            briefPublishedDate: jobPost.updatedAt
        }, {
            upsert: true
        });

        req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.BRIEF_ADDED;
        req.body.jobPostId = mongoose.Types.ObjectId(req.body.id);
        await SendNotification.sendNotification(req, user, local);
        addSkill(jobPost.hardSkills);
        addSkill(jobPost.softSkills);
        this.sendEmails(user.role, req.headers.authorization, req.body.id);
        this.sendToHREmail(user, req.body.id);
        return jobPost;
    }

    static async sendEmails(userRole, token, jobBriefId) {
        const limit = 20
        const jobPost = await JobPost.findById(jobBriefId, ['name', 'role', 'workPreference', 'hardSkills', 'duration','currency','ratePerHour','assignments','expertise']);
        if (!(jobPost.name.indexOf('Request Sanity Testing') !== -1)) {
            const response = await getRecommandedCandidatesFromJobRoleWithPage(userRole, token, jobPost.role, 1, limit)
            const totalDocs = response && response.body && response.body.data && response.body.data.totalDocs ? response.body.data.totalDocs : 0
            const itr = totalDocs / limit;
            for (let i = 0; i < itr; i++) {
                const response = await getRecommandedCandidatesFromJobRoleWithPage(userRole, token, jobPost.role, i + 1, limit)
                if (response && response.body && response.body.data && response.body.data.docs && response.body.data.docs.length > 0) {
                    for (let j = 0; j < response.body.data.docs.length; j++) {
                        await this.sendEmail(response.body.data.docs[j], jobBriefId, jobPost)
                    }
                }
            }
        }
    }

    static async sendEmail(talent, jobBriefId, jobPost) {
        const talentFirstName = `${talent.firstName}`;
        const subject = `${talentFirstName} you have a new opportunity posted on CodeMonk`;
        const template = 'emailTemplates/publishJobBrief.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        let skills = '';
        if (jobPost.hardSkills) {
            for (const skill of jobPost.hardSkills) {
                skills += `<div
                style="background: url(https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/emailtemplate/images/tag-background.png?v1.1);display: inline-block;padding: 6px 15px;border-radius: 15px;font-size: 16px;line-height: 18px;text-align: center;color: #04004E;margin-right: 8px;margin-bottom: 15px;background-size: 100%;background-repeat: repeat;">
                 ${skill}
              </div>`
            }
        }
        let currencyValue = '$';
        currency.forEach((cur) => {
            if (cur.value === jobPost.currency) {
                currencyValue = cur.symbol;
            }
        });
        let salary = `${currencyValue} ${jobPost.ratePerHour}`
        const templateVariables = {
            appUrl,
            salary,
            talentFirstName,
            actionUrl: `${appUrl}/brief-detail/${jobBriefId}`,
            role: jobPost.role ? jobPost.role : '',
            skills,
            expertise: jobPost.expertise ? CONSTANTS.YEAR_OF_EXPERIENCE_LABEL[jobPost.expertise] : '',

            assignments: jobPost.assignments && jobPost.assignments.length ? jobPost.assignments.map(w => CONSTANTS.ASSIGNMENTS_LABEL[w]).join(', ') : '',
            workPreference: jobPost.workPreference && jobPost.workPreference.length ? jobPost.workPreference.map(w => CONSTANTS.WORK_PREFERENCE_LABEL[w]).join(', ') : '',
            duration: jobPost.duration ? jobPost.duration + ' Months' : ''
        };
        await Email.prepareAndSendEmail([talent.email], subject, template, templateVariables);
    }

    static async sendToHREmail(client, jobBriefId) {
        const jobPost = await JobPost.findById(jobBriefId, ['name', 'role', 'workPreference', 'hardSkills', 'duration','currency','ratePerHour','assignments','expertise']);
        const clientName=client.firstName + ' ' + client.lastName;
        const subject = `${clientName} wants to hire ${jobPost.name}`;
        const template = 'emailTemplates/hrJobBrief.html';
        const appUrl = process.env.FRONTEND_URL_ADMIN;
        let skills = '';
        if (jobPost.hardSkills) {
            for (const skill of jobPost.hardSkills) {
                skills += `<div
                style="background: url(https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/emailtemplate/images/tag-background.png?v1.1);display: inline-block;padding: 6px 15px;border-radius: 15px;font-size: 16px;line-height: 18px;text-align: center;color: #04004E;margin-right: 8px;margin-bottom: 15px;background-size: 100%;background-repeat: repeat;">
                 ${skill}
              </div>`
            }
        }
        let currencyValue = '$';
        currency.forEach((cur) => {
            if (cur.value === jobPost.currency) {
                currencyValue = cur.symbol;
            }
        });
        const salary = `${currencyValue} ${jobPost.ratePerHour}`
        const templateVariables = {
            appUrl,
            salary,
            clientName,
            name: jobPost.name,
            actionUrl: `${appUrl}/brief-detail/${jobBriefId}`,
            skills,
            expertise: jobPost.expertise ? CONSTANTS.YEAR_OF_EXPERIENCE_LABEL[jobPost.expertise] : '',
            assignments: jobPost.assignments && jobPost.assignments.length ? jobPost.assignments.map(w => CONSTANTS.ASSIGNMENTS_LABEL[w]).join(', ') : '',
            workPreference: jobPost.workPreference && jobPost.workPreference.length ? jobPost.workPreference.map(w => CONSTANTS.WORK_PREFERENCE_LABEL[w]).join(', ') : '',
            duration: jobPost.duration ? jobPost.duration + ' Months' : ''
        };
        await Email.prepareAndSendEmail([CONSTANTS.HR_EMAIL], subject, template, templateVariables);
        
    }
}

module.exports = AddJobPostPreferredCandidatesService;
