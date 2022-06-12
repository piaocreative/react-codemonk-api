const Interview = require('../../models/interview.model');

/**
 * Class represents services for admin change interview status of talent
 */
class AdminInterviewChangeTalentStatusSecondService {
    /**
     * @desc This function is being used to admin change interview status of talent
     * @author CodeMonk
     * @since 18/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async updateTalentStatus (interviewId, status) {
        return await Interview.findByIdAndUpdate(interviewId,
            {
                $set: { talentStatus: status }
            }, { new: true });
    }

    static async updateInterviewTalentStatus (jobPostId, status) {
        return await Interview.updateOne({ jobPostId },
            {
                $set: { talentStatus: status }
            });
    }
}

module.exports = AdminInterviewChangeTalentStatusSecondService;
