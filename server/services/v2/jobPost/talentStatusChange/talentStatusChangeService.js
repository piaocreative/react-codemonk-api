const mongoose = require('mongoose');
const JobPost = require('../../../../models/jobPost.model');
const Project = require('../../../../models/project.model');
const Talent = require('../../../../models/talent.model');
const User = require('../../../../models/user.model');
const Client = require('../../../../models/client.model');

const TalentStatusChangeValidator = require('./talentStatusChangeValidator');
const TalentStatusChangeSecondService = require('./talentStatusChangeSecondService');
const AdminInterviewChangeTalentStatusSecondService =
require('../../../adminInterviewChangeTalentStatus/adminInterviewChangeTalentStatusSecondService');
const ClientAddInterviewScheduleSecondService =
require('../../../clientAddInterviewSchedule/clientAddInterviewScheduleSecondService');

const {
    ROLE: { CLIENT, ADMIN },
    BRIEF: { TALENT: {
        STATUS: { INTERVIEW, SHORTLISTED,HIRED, REJECTED }
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
    static async changeTalentStatus (req, user, local) {
        const Validator = new TalentStatusChangeValidator(req.body, local);
        await Validator.TalentStatusChangeByAdmin();

        const where = {
            _id: mongoose.Types.ObjectId(req.body.jobPostId),
            'applications.talentId': mongoose.Types.ObjectId(req.body.talentId)
        };

        if (user.role === CLIENT) {
            where.clientId = user._id;
        }

        const jobPostExists = await JobPost.findOne(where).lean();
        const currentStatus = jobPostExists && jobPostExists.applications && Array.isArray(jobPostExists.applications) ?
            jobPostExists.applications.filter((a) => JSON.stringify(a.talentId) === JSON.stringify(req.body.talentId))
                .reduce((_, cs) => cs.status, -1) : -1;
        Validator.checkStatusUpdate(currentStatus);

        const jobPost = await TalentStatusChangeSecondService.changeTalentStatus(mongoose.Types.ObjectId(req.body.jobPostId),
            mongoose.Types.ObjectId(req.body.talentId),req.body.status, user.role, user._id);

        if ([SHORTLISTED, HIRED, REJECTED].includes(req.body.status)) {
            AdminInterviewChangeTalentStatusSecondService.updateInterviewTalentStatus(jobPost._id,
                TalentStatusChangeService.convertStatusToInterviewTalentStatus(req.body.status));
        }

        await TalentStatusChangeService.createInterviewForTalent(req, jobPost, user, local);
        return jobPost;
    }

    static async createInterviewForTalent(req, jobPost, user, local) {
        if ([INTERVIEW].includes(req.body.status) && req.body.timeSlots) {
            const talent = await Talent.findOne({ userId: mongoose.Types.ObjectId(req.body.talentId) });
            const project = await Project.findById(jobPost.projectId);
            const data = {
                talentId: talent._id,
                projectId: project._id,
                name: project.name,
                description: project.description,
                timeSlots: req.body.timeSlots,
                jobPostId: req.body.jobPostId
            };
            let client = user;
            if (user.role === ADMIN) {
                const userObj = await User.findOne({ _id: jobPost.clientId }, {
                    password: 0,
                    __v: 0,
                    otp: 0,
                    phoneOtp: 0,
                    resetToken: 0,
                    resetExpiryTime: 0,
                    requestedCountryCode: 0,
                    requestedPhoneNumber: 0,
                    requestedEmail: 0
                }).lean();
                const clientObject = await Client.findOne({ userId: jobPost.clientId }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                client = _.merge(userObj, clientObject, {administratorUser:user.administratorUser});
            }
            await ClientAddInterviewScheduleSecondService.addInterviewSchedule(data, client, local);
        }
    }

    static convertStatusToInterviewTalentStatus (status) {
        let interviewTalentStatus = 0;
        switch (status) {
            case HIRED:
                interviewTalentStatus = 1;
                break;
            case REJECTED:
                interviewTalentStatus = 0;
                break;
            case SHORTLISTED:
                interviewTalentStatus = 2;
                break;
        }
        return interviewTalentStatus;
    }
}

module.exports = TalentStatusChangeService;
