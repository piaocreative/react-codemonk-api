const JobPostValidator = require('./jobPostValidator');
const { findOrCreateProjectByNameAndClient } = require('../../addProject/addProjectService');
const { ROLE: { ADMIN } } = require('../../../util/constants');
const AutoGeneratorService = require('../../autoGenerator/autoGeneratorService');
const moment = require('moment');
const JobPost = require('../../../models/jobPost.model');
const HubSpot = require('../../hubSpot/hubSpot');
const JobPostDTO = require('./dto/jobPostDTO');
const { getRecommandedCandidatesFromJobRoleWithPage } = require('../../algoProxyServer/algoServerService');
const currency = require('../../../util/currency');
const Email = require('../../../util/sendEmail');
const User = require('../../../models/user.model');
const BotService = require('../../../util/sendJobPostNotification');
const VisitHistory = require('../../../models/visitHistory.model');
const mongoose = require('mongoose');
const { addSkill } = require('../../skills/skillServices');
const SendNotification = require('../../../util/sendNotification');
const TwitterBot = require('../../twitter/twitterBotService');

class JobPostService {
    static async addJobPost (req, user, local) {
        const Validator = new JobPostValidator(req.body, local);
        await Validator.jobPost();
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
        const jobPost = JobPostDTO.prepareJobPostObject(req.body);

        jobPost.projectId = projectId;
        jobPost.status = CONSTANTS.BRIEF.STATUS.ACTIVE;
        jobPost.step = CONSTANTS.BRIEF.STEP.ENGAGEMENT;
        jobPost.addedBy = user._id;
        jobPost.clientId = clientId;

        let autoCount = await AutoGeneratorService.nextAutoGenerateNumber('job-post');
        autoCount = autoCount + '';
        jobPost.jobId = autoCount + moment().format('YYMMDD');

        const result = await JobPost.create(jobPost);

        await VisitHistory.updateOne({
        }, {
            briefId: mongoose.Types.ObjectId(req.body.id),
            briefPublishedDate: jobPost.updatedAt
        }, {
            upsert: true
        });

        await addSkill(jobPost.hardSkills);
        await addSkill(jobPost.softSkills);

        // Set hubspot contact action, don't wait.
        HubSpot.updateContact(user, {
            'posted': true,
            'latest_job_brief_posted': `${ jobPost.name } ${ jobPost.description }`
        });

        req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.BRIEF_ADDED;
        req.body.jobPostId = result._id;
        await SendNotification.sendNotification(req, user, local);
        this.sendEmails(user.role, req.headers.authorization, result._id);
        await this.sendToHREmail(result._id);

        await this.sendNotificationToDiscordServer(req.body.jobPostId);
        await this.postJobToTwitter(req.body.jobPostId);

        return result;
    }

    static async updateJobPost (req, local) {
        const Validator = new JobPostValidator(req.body, local);
        await Validator.jobPost(true);
        const jobPost = JobPostDTO.prepareJobPostObject(req.body, local);
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        return await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
    }

    static async sendEmails (userRole, token, jobBriefId) {
        const limit = 20;
        const jobPost = await JobPost.findById(jobBriefId,
            ['name', 'role', 'workPreference', 'hardSkills', 'duration', 'currency', 'ratePerHour', 'assignments', 'expertise']);
        if (!(jobPost.name.indexOf('Request Sanity Testing') !== -1)) {
            const response = await getRecommandedCandidatesFromJobRoleWithPage(userRole, token, jobPost.role, 1, limit);
            const totalDocs = response && response.body && response.body.data && response.body.data.totalDocs ? response.body.data.totalDocs : 0;
            const itr = totalDocs / limit;
            for (let i = 0; i < itr; i++) {
                const response = await getRecommandedCandidatesFromJobRoleWithPage(userRole, token, jobPost.role, i + 1, limit);
                if (response && response.body && response.body.data && response.body.data.docs && response.body.data.docs.length > 0) {
                    for (let j = 0; j < response.body.data.docs.length; j++) {
                        await this.sendEmail(response.body.data.docs[j], jobBriefId, jobPost);
                    }
                }
            }
        }
    }

    static async sendEmail (talent, jobBriefId, jobPost) {
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
              </div>`;
            }
        }
        let currencyValue = '$';
        currency.forEach((cur) => {
            if (cur.value === jobPost.currency) {
                currencyValue = cur.symbol;
            }
        });
        const salary = `${currencyValue} ${jobPost.ratePerHour}`;
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

    static async sendToHREmail (jobBriefId) {
        const jobPost = await JobPost.findById(jobBriefId, ['name', 'role', 'workPreference', 'hardSkills', 'duration', 'currency', 'ratePerHour', 'assignments', 'expertise', 'clientId']);
        const client = await User.findById(jobPost.clientId, ['firstName', 'lastName']);
        const clientName = client.firstName + ' ' + client.lastName;
        const subject = `${clientName} wants to hire ${jobPost.name}`;
        const template = 'emailTemplates/hrJobBrief.html';
        const appUrl = process.env.FRONTEND_URL + '/admin';
        let skills = '';
        if (jobPost.hardSkills) {
            for (const skill of jobPost.hardSkills) {
                skills += `<div
                style="background: url(https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/emailtemplate/images/tag-background.png?v1.1);display: inline-block;padding: 6px 15px;border-radius: 15px;font-size: 16px;line-height: 18px;text-align: center;color: #04004E;margin-right: 8px;margin-bottom: 15px;background-size: 100%;background-repeat: repeat;">
                 ${skill}
              </div>`;
            }
        }
        let currencyValue = '$';
        currency.forEach((cur) => {
            if (cur.value === jobPost.currency) {
                currencyValue = cur.symbol;
            }
        });
        const salary = `${currencyValue} ${jobPost.ratePerHour}`;
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
        await Email.prepareAndSendEmail(CONSTANTS.HR_EMAIL[process.env.NODE_ENV], subject, template, templateVariables);
    }

    static async sendNotificationToDiscordServer (jobBriefId) {
        try {
            const jobPost = await JobPost.findById(jobBriefId,
                ['name', 'role', 'workPreference', 'hardSkills', 'duration', 'currency', 'ratePerHour', 'assignments', 'expertise', 'employmentType', 'currencyAnnualRate', 'annualRate']);
            const appUrl = process.env.FRONTEND_URL_TALENT;

            let currencyValue = '$';
            let jobPostCurrency = jobPost.currency;
            let rate = jobPost.ratePerHour;
            let perTime = 'hour';


            if (jobPost.employmentType && Array.isArray(jobPost.employmentType) && jobPost.employmentType.length) {
                if (!(jobPost.employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) === -1)) {
                    jobPostCurrency = jobPost.currency;
                    rate = jobPost.ratePerHour;
                }

                if (!(jobPost.employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE) === -1)) {
                    jobPostCurrency = jobPost.currencyAnnualRate;
                    rate = jobPost.annualRate;
                    perTime = 'annum';
                }
            }

            currency.forEach((cur) => {
                if (cur.value === jobPostCurrency) {
                    currencyValue = cur.symbol;
                }
            });
            const salary = `${currencyValue} ${rate}/${perTime}`;
            const templateVariables = {
                salary,
                employmentType: jobPost.employmentType && Array.isArray(jobPost.employmentType) && jobPost.employmentType.length ? jobPost.employmentType.map(e=> CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL2[e]).join(', ') : '',
                actionUrl: `${appUrl}/brief-detail/${jobBriefId}`,
                skills: jobPost.hardSkills && jobPost.hardSkills.length ? jobPost.hardSkills.join(', ') : '',
                expertise: jobPost.expertise ? CONSTANTS.YEAR_OF_EXPERIENCE_LABEL[jobPost.expertise] : ''
            };

            const title = `${templateVariables.expertise} ${jobPost.name} Paying up to: ${salary}`;
            const description = `Skills required:\n${templateVariables.skills}\n\nContract type:\n${templateVariables.employmentType}\n\nPaying up to:\n${salary}\n\nMore details:\n${templateVariables.actionUrl}`;


            await BotService.sendMessage(title, description, templateVariables.actionUrl);
        } catch (e) {
            CONSOLE_LOGGER.error(e);
        }
    }

    static async postJobToTwitter (jobBriefId) {
        try {
            const jobPost = await JobPost.findById(jobBriefId,
                ['name', 'role', 'workPreference', 'hardSkills', 'duration', 'currency', 'ratePerHour', 'assignments', 'expertise', 'employmentType', 'currencyAnnualRate', 'annualRate']);
            const appUrl = process.env.FRONTEND_URL_TALENT;

            let skills = '#';
            if (jobPost.hardSkills && jobPost.hardSkills.length) {
                skills += jobPost.hardSkills.join(' #');
            }

            const tweet = `#Hiringnow for ${skills} \nApply here ${appUrl}/brief-detail/${jobBriefId} \n#remotejob #web3 #dao #borderless #teams`;

            await TwitterBot.postTweet(tweet);

        } catch (e) {
            CONSOLE_LOGGER.error(e);
        }
    }
}

module.exports = JobPostService;
