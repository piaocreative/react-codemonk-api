const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const Project = require('../../models/project.model');
const CodeMonkError = require('../../util/CodeMonkError');
const SendNotification = require('../../util/sendNotification');
const TalentEventlogRecordService = require('../v2/talentEventlogRecord/talentEventlogRecordService');
const TalentReferralLogService = require('../v2/talentReferralLog/talentReferralLogService');

/**
 * Class represents services for add talent to a project by admin
 */
class AddTalentToProjectByAdminService {

    /**
     * @desc This function is being used to add talent to a project by admin
     * @author CodeMonk
     * @since 18/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addTalentToProjectByAdmin (talentUserId, projectId, startDate, endDate, local, createdBy) {

        const isTalentEligible = await User.findOne({
            _id: talentUserId,
            isActive: 1,
            role: 1
        }, { _id: 1, userId: 1, firstName: 1, lastName: 1 }).lean();

        if (isTalentEligible) {
            const checkTalentsAlreadyAdded = await Project.findOne({
                _id: projectId,
                'talents.talentId': talentUserId
            }).lean();

            if (!checkTalentsAlreadyAdded) {
                const addTalent = {
                    talentId: talentUserId,
                    startDate,
                    endDate,
                    status: 1
                };
                const projectDetials = await Project.findOneAndUpdate({
                    _id: projectId
                }, {
                    $addToSet: { talents: addTalent }
                });
                const req = {body:{}};
                req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.TALENT_ADDED;
                req.body.projectId = projectId,
                req.body.talentId = isTalentEligible._id,
                req.body.clientId = projectDetials.clientId,
                req.body.projectName = projectDetials.name;
                req.body.talentName = `${isTalentEligible.firstName} ${isTalentEligible.lastName}`;
                await SendNotification.sendNotification(req, {}, local);
                await TalentEventlogRecordService.addEventLog(talentUserId, 'addToProject', `Added to project ${projectDetials.name}`, Date.now(), createdBy);
                const talent = await Talent.findOne({ userId: talentUserId });
                if (talent && !talent.isHiredFirst) {
                    // DB update - Referral: Update "daysOfRefereeActivated" where "refereeUserId".
                    await TalentReferralLogService.updateReferralLog(talentUserId, 'Hired');
                    await TalentReferralLogService.updateReferralLog(projectDetials.clientId, 'Hired');
                    await Talent.updateOne({ userId: talentUserId }, { $set: { isHiredFirst: true } });
                }
            } else {
                throw new CodeMonkError(local('TALENT_ALREADY_EXISTS_PROJECT'), 400);
            }
        } else {
            throw new CodeMonkError(local('INVALID_TALENT'), 400);
        }
    }
}

module.exports = AddTalentToProjectByAdminService;
