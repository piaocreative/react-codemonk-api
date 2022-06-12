const mongoose = require('mongoose');
const Project = require('../../models/project.model');
const TalentStatusChangeForProjectValidator = require('./talentStatusChangeForProjectValidator');
const Utils = require('../../util/utilFunctions');
const TalentEventlogRecordService = require('../v2/talentEventlogRecord/talentEventlogRecordService');


/**
 * Class represents services for project talent status change
 */
class TalentStatusChangeForProjectService {
    /**
     * @desc This function is being used to project talent status change
     * @author Innovify
     * @since 21/09/2020
     * @param {Object} req Request
     * @param {String} req.body.projectId project id
     * @param {String} req.body.talentId talent id
     * @param {Number} req.body.status status that needs to be change
     * @param {Object} user logged in user data
     */
    static async changeTalentStatus(req, user, local) {
        const Validator = new TalentStatusChangeForProjectValidator(req.body, local);
        await Validator.TalentStatusChangeForProjectByAdmin();
        const where = {
            _id: mongoose.Types.ObjectId(req.body.projectId),
            'talents.talentId': mongoose.Types.ObjectId(req.body.talentId)
        };

        if (user.role === CONSTANTS.ROLE.CLIENT) {
            where.clientId = user._id;
            await Project.updateOne(where, {
                $set: {
                    'talents.$.status': req.body.status
                }
            });
        } else {
            Validator.checkDate(req.body.startDate, 'Start date');
            Validator.checkDate(req.body.endDate, 'End date');
            await Project.updateOne(where, {
                $set: {
                    'talents.$.status': req.body.status,
                    'talents.$.startDate': Utils.getDateFromDDMMYYY(req.body.startDate),
                    'talents.$.endDate': Utils.getDateFromDDMMYYY(req.body.endDate)
                }
            });
        }
        const project = await Project.findOne(where);
        if( req.body.status === 0){
            await TalentEventlogRecordService.addEventLog(req.body.talentId, "removeFromProject", `Removed from project ${project.name}`, Date.now(), user._id);
        } else if( req.body.status === 1){
            await TalentEventlogRecordService.addEventLog(req.body.talentId, "addToProject", `Added to project ${project.name}`, Date.now(), user._id);
        }
    }
}

module.exports = TalentStatusChangeForProjectService;