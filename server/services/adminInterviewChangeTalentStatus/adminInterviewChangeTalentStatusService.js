const mongoose = require('mongoose');
const Interview = require('../../models/interview.model');
const Client = require('../../models/client.model');
const HubSpot = require('../hubSpot/hubSpot');

const AdminInterviewChangeTalentStatusValidator = require('./adminInterviewChangeTalentStatusValidator');
const AdminInterviewChangeTalentStatusSecondService = require('./adminInterviewChangeTalentStatusSecondService');
const TalentStatusChangeSecondService = require('../v2/jobPost/talentStatusChange/talentStatusChangeSecondService');
const {
    BRIEF: { TALENT: {
        STATUS: { SHORTLISTED,HIRED, REJECTED }
    } }
} = require('../../util/constants');

/**
 * Class represents services for admin change interview status of talent
 */
class AdminInterviewChangeTalentStatusService {
    /**
     * @desc This function is being used to admin change interview status of talent
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async talentStatus (req, local) {
        const Validator = new AdminInterviewChangeTalentStatusValidator(req.body, local);
        await Validator.changeTalentInteviewStatusByAdmin();

        const interview = await AdminInterviewChangeTalentStatusSecondService
            .updateTalentStatus(mongoose.Types.ObjectId(req.body.interviewId, parseInt(req.body.status)));

        // Update interview and project
        if (interview.jobPostId) {
            TalentStatusChangeSecondService.changeTalentStatus(interview.jobPostId,
                interview.talentId, parseInt(req.body.status) === 2 ? SHORTLISTED : (parseInt(req.body.status) === 1 ? HIRED:REJECTED));

            // talent is hired, set HubSpot action
            const int = await Interview.findById(mongoose.Types.ObjectId(req.body.interviewId), ['clientId']);
            const client = await Client.findOne({ userId: int.clientId });
            HubSpot.updateContact(client, { 'hired': true });
        }
        return interview;
    }
}

module.exports = AdminInterviewChangeTalentStatusService;
