const mongoose = require('mongoose');
const AddTalentToProjectByAdminValidator = require('./addTalentToProjectByAdminValidator');
const AddTalentToProjectByAdminSecondService = require('./addTalentToProjectByAdminSecondService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for add talent to a project by admin
 */
class AddTalentToProjectByAdminService {

    /**
     * @desc This function is being used to add talent to a project by admin
     * @author Innovify
     * @since 17/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addTalentToProjectByAdmin (req, user, local) {
        const Validator = new AddTalentToProjectByAdminValidator(req.body, local);
        await Validator.addTalentToProjectByAdmin();

        await AddTalentToProjectByAdminSecondService.addTalentToProjectByAdmin( mongoose.Types.ObjectId(req.body.talentId),
            mongoose.Types.ObjectId(req.body.projectId), Utils.getDateFromDDMMYYY(req.body.startDate),
            Utils.getDateFromDDMMYYY(req.body.endDate), local, user._id );

    }
}

module.exports = AddTalentToProjectByAdminService;
