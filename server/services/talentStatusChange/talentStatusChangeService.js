const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const TalentStatusChangeValidator = require('./talentStatusChangeValidator');
const TalentEventlogRecordService = require('../v2/talentEventlogRecord/talentEventlogRecordService');

/**
 * Class represents services for talent status change
 */
class TalentDetailsService {
    /**
     * @desc This function is being used to talent status change
     * @author Innovify
     * @since 13/11/2020
     * @param {Object} req Request
     * @param {String} req.body.talentId params talent id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, user, local) {
        const Validator = new TalentStatusChangeValidator(req.body, local);
        await Validator.talentStatusChange();
        const status = req.body.status;

        await Talent.updateOne({
            userId: mongoose.Types.ObjectId(req.body.talentId)
        }, {
            $set: {
                isActive: status
            }
        });

        await User.updateOne({
            _id: mongoose.Types.ObjectId(req.body.talentId)
        }, {
            $set: {
                isActive: status
            }
        });
        if(status === 2){
            await TalentEventlogRecordService.addEventLog(req.body.talentId, "suspended", `Profile Suspended`, Date.now(), user._id);
        }else if(status === 1){
            await TalentEventlogRecordService.addEventLog(req.body.talentId, "activated", `Profile Activated`, Date.now(), user._id);
        }
    }
}

module.exports = TalentDetailsService;
