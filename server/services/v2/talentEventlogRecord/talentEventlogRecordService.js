const Eventlog = require('../../../models/eventlog.model');

/**
 * Class represents services for assigning referrer to the talent.
 */

class TalentEventlogRecordService {

    /**
     * @desc This function is being used to assign referrer to the talent
     * @author CodeMonk
     * @since 31/1/2021
     */
    static async addEventLog(userId, type, content, createdAt = Date.now(), createdBy = undefined) {
        await Eventlog.create({
            userId,
            type,
            content,
            createdAt,
            createdBy : createdBy ? createdBy : userId,
        })
    }
}

module.exports = TalentEventlogRecordService;
