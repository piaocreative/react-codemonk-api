const Talent = require('../../../models/talent.model');
const VerifyTalentProfileValidator = require('./verifyTalentProfileValidator');
const TalentEventlogRecordService = require('../talentEventlogRecord/talentEventlogRecordService');
const TalentReferralLogService = require('../talentReferralLog/talentReferralLogService');

/**
 * @name VerifyTalentProfileService profile service
 */
class VerifyTalentProfileService {


    /**
     * @desc This function is being used to verify the talent profile
     * @author CodeMonk
     * @since 01/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async verifyTalentProfile (req, user, local) {
        const talent = await Talent.findById(req.params.id);
        const Validator = new VerifyTalentProfileValidator(req.body, local);

        talent.verifiedProfile = Validator.checkStatusUpdate(talent.verifiedProfile, user.role);

        if (talent && talent.verifiedProfile) {
            await TalentEventlogRecordService.addEventLog(talent.userId, 'verified', 'Profile Verified', Date.now(), user._id);
            await TalentReferralLogService.updateReferralLog(talent.userId, 'Verified');
        } else if (talent && !talent.verifiedProfile) {
            await TalentEventlogRecordService.addEventLog(talent.userId, 'in-review', 'Profile In-review', Date.now(), user._id);
        }

        await Talent.findByIdAndUpdate(req.params.id, { $set: { verifiedProfile: talent.verifiedProfile } }, { new: true });
    }
}

module.exports = VerifyTalentProfileService;
