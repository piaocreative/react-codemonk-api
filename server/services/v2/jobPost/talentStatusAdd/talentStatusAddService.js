const mongoose = require('mongoose');
const JobPost = require('../../../../models/jobPost.model');
const TalentStatusChangeValidator = require('../talentStatusChange/talentStatusChangeValidator');
const TalentStatusChangeSecondService = require('../talentStatusChange/talentStatusChangeSecondService');
const TalentStatusChangeService = require('../talentStatusChange/talentStatusChangeService');
const AdminInterviewChangeTalentStatusSecondService =
    require('../../../adminInterviewChangeTalentStatus/adminInterviewChangeTalentStatusSecondService');
const TalentStatusAddHelper = require('./talentStatusAdd.helper');
const {
    ROLE: { CLIENT },
    BRIEF: { TALENT: {
        STATUS: { SHORTLISTED, HIRED, REJECTED }
    } }
} = require('../../../../util/constants');

/**
 * Class represents services for job post talent status change
 */
class TalentStatusAddService {

    /**
     * @desc This function is being used to add Talent to a Job Brief.
     * @author CodeMonk
     * @since 08/03/2022
     * @param {Object} req Request
     * @param {String} req.body.jobPostId jobpost id
     * @param {String} req.body.talentId talent id
     * @param {Number} req.body.status status that needs to be add
     * @param {Object} user logged in user data
     */
    static async addTalentStatus(req, user, local) {
        // Validate parameters.
        const Validator = new TalentStatusChangeValidator(req.body, local);
        await Validator.TalentStatusChangeByAdmin();

        const { jobPostId, talentId, status } = req.body;

        // DB update - JobPost: Add talent to a job's application.
        const newApplicationData = { talentId: mongoose.Types.ObjectId(talentId), status };
        const jobPostUpdated = await TalentStatusAddHelper.updateJobPostApplicationAdd(newApplicationData, jobPostId, user, local);

        // Sending Emails.
        switch (status) {
            case HIRED:
                // Send email to HR to request to hire a talent.
                await TalentStatusChangeSecondService.sendTalentHiringRequestToHR(jobPostUpdated, newApplicationData.talentId);
                break;
            case REJECTED:
                // Send email to Talent to announce the rejection.
                await TalentStatusChangeSecondService.sendRejectEmailToTalent(jobPostUpdated, newApplicationData.talentId);
                break;
        }

        // DB update - Interview: Update interview status.
        if ([SHORTLISTED, HIRED, REJECTED].includes(status)) {
            AdminInterviewChangeTalentStatusSecondService.updateInterviewTalentStatus(jobPostUpdated._id,
                TalentStatusChangeService.convertStatusToInterviewTalentStatus(status));
        }

        await TalentStatusChangeService.createInterviewForTalent(req, jobPostUpdated, user, local);

        return jobPostUpdated;
    }

}

module.exports = TalentStatusAddService;
