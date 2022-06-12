const Referral = require('../../../models/referral.model');

/**
 * Class represents services for assigning referrer to the talent.
 */

class TalentReferralLogService {

    /**
     * @desc This function is being used to assign referrer to the talent
     * @author CodeMonk
     * @since 08/02/2022
     */
    static async updateReferralLog (userId, type, createdAt = Date.now()) {
        try {


            const referral = await Referral.findOne({ refereeUserId: userId });
            if ( referral) {
                const diffDays = referral.referredOn ? MOMENT(referral.referredOn).diff(MOMENT(createdAt), 'days') : 0;

                const updatedData = TalentReferralLogService.prepareUpdateData(type, diffDays);

                await Referral.findOneAndUpdate({ refereeUserId: userId }, { $set: updatedData }, { new: true });
            }
        } catch (e) {
            CONSOLE_LOGGER.error(e);
        }
    }

    static prepareUpdateData (type, diffDays) {
        const updatedData = {};
        switch (type) {
            case 'Active':
                updatedData.daysOfRefereeActivated = diffDays;
                break;
            case 'Verified':
                updatedData.daysOfRefereeVerified = diffDays;
                break;
            case 'Hired':
                updatedData.daysOfRefereeHired = diffDays;
                break;
        }
        return updatedData;
    }
}

module.exports = TalentReferralLogService;
