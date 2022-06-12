const mongoose = require('mongoose');
const Interview = require('../../models/interview.model');
const ClientAddInterviewValidator = require('./clientAddInterviewScheduleValidator');
const { findOrCreateProjectByName } = require('../addProject/addProjectService');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');
const moment = require('moment');
const HubSpot = require('../hubSpot/hubSpot');

/**
 * Class represents services for add interview for project to talent by client
 */
class ClientAddInterviewSecondService {

    /**
     * @desc This function is being used to add interview for project to talent by client
     * @author Innovify
     * @since 01/10/2020
     * @param {Object} req Request
     * @param {Object} data RequestBody
     * @param {Object} res Response
     */
    static async addInterviewSchedule (data, user, local) {
        const Validator = new ClientAddInterviewValidator(data, local);
        await Validator.addInterviewSchedule();
        const clientId = user._id;
        const talentId = mongoose.Types.ObjectId(data.talentId);
        let projectId = (data.projectId) ? mongoose.Types.ObjectId(data.projectId) : '';
        const name = data.name;
        const description = data.description;
        const timeSlots = data.timeSlots.map(d => {
            return {
                requestedSlot: MOMENT(d).utc(),
                isAccepted: 0
            };
        });

        if (!projectId) {
            projectId = await findOrCreateProjectByName(clientId, name, description);
        }

        await ClientAddInterviewSecondService.isInterviewAlreadyScheduledForProject(projectId, talentId, local);

        const newInterview = await Interview.create({
            clientId,
            talentId,
            projectId,
            name,
            description,
            timeSlots,
            ...(data.jobPostId &&  { jobPostId: mongoose.Types.ObjectId(data.jobPostId) })
        });

        // Set hubspot contact action, don't wait.
        HubSpot.updateContact(user, { 'interviewed': true });

        this.sendToHREmail(user, newInterview);

        return newInterview;
    }

    static async isInterviewAlreadyScheduledForProject (projectId, talentId, local) {
        const interview = await Interview.findOne({ projectId, talentId });
        if (interview) {
            throw new CodeMonkError(local('INTERVIEW_ALREADY_SCHEDULED_FOR_PROJECT'), 400);
        }
    }

    static async sendToHREmail (user, interview) {
        const clientName = user.firstName + ' ' + user.lastName;
        const talent = await Talent.findById(interview.talentId);
        const talentUser = await User.findById(talent.userId, ['firstName', 'lastName']);
        const talentName = talentUser.firstName + ' ' + talentUser.lastName;
        const subject = `${clientName} wants to interview ${talentName} for ${interview.name} role`;
        const template = 'emailTemplates/interviewHR.html';
        const appUrl = process.env.FRONTEND_URL + '/admin';
        let availabilityList = '<ul>';
        let i = 0;
        for (const timeSlot of interview.timeSlots) {
            i++;
            const dateTime = moment(timeSlot.requestedSlot).format('DD-MM-YYYY')+ ' at '+ moment(timeSlot.requestedSlot).format('HH:MM')
            availabilityList += `<li>${i}. ${dateTime}</li>`;
        }
        availabilityList += '</ul>';
        const templateVariables = {
            appUrl,
            clientName,
            talentName,
            availabilityList,
            JOBTITLE: interview.name
        };
        await Email.prepareAndSendEmail(CONSTANTS.HR_EMAIL[process.env.NODE_ENV], subject, template, templateVariables);
    }
}

module.exports = ClientAddInterviewSecondService;
