const Referral = require('../../../models/referral.model');

/**
 * Class represents services for assigning referrer to the talent.
 */

class AssignReferrerToTalentService {

    /**
     * @desc This function is being used to assign referrer to the talent
     * @author CodeMonk
     * @since 22/10/2021
     */
    static async assignReferrerToTalent(user, referrerUserId) {
        return await Referral.findOneAndUpdate({ refereeEmailId: user.email, referrerUserId },
            { $set: { refereeEmailId: user.email, referrerUserId, refereeUserId: user._id, status: 1, registeredOn: Date.now() } },
            { upsert: true });
    }

    static async assignReferrerToTalentFromInvite(email, referrerUserId, name = '' ) {
        await Referral.findOneAndUpdate({ refereeEmailId: email, referrerUserId },
            { $set: { refereeEmailId: email, referrerUserId, status: 0, referredOn: Date.now(), ...(!!name && {fullNameOfReferee: name}) } },
            { upsert: true });
    }
    /*
     End
    */
}

module.exports = AssignReferrerToTalentService;
