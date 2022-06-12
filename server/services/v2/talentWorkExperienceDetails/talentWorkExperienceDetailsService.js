const mongoose = require('mongoose');
const User = require('../../../models/user.model');
const Talent = require('../../../models/talent.model');
const AgencyTalent = require('../../../models/agencyTalent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const AddCompanyService = require('../addCompany/addCompanyService');
const utils = require('../../../util/utilFunctions');


/**
 * Class represents services for Talent Work Experience Details.
 */
class TalentWorkExperienceDetailsService {

    /**
     * @desc This function is being used to add talent work experience
     *  beginning of workExperience array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentWorkExperience (req, user, local) {
        const company = await AddCompanyService.addCompany(req, local);

        const updateData = await TalentPrepareEditData.prepareWorkExperienceAdd(req.body, local, company);
        const talentWhere = await TalentWorkExperienceDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.WORK_EXPERIENCE_DETAIL);
        if (signupStep) {
            await Talent.updateOne(talentWhere, { signupStep });
        }
        const updated = await TalentWorkExperienceDetailsService.updateTalentData(talentWhere, updateData);
        return updated;
    }

    /**
     * @desc This function is being used to delete talent work experience
     *  based on id of workExperience array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentWorkExperience (req, user, local) {
        const updateData = await TalentPrepareEditData.prepareWorkExperienceDelete(req.body, local);
        const talentWhere = await TalentWorkExperienceDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentWorkExperienceDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentWorkExperience (req, user, local) {
        const company = await AddCompanyService.addCompany(req, local);

        const updateData = await TalentPrepareEditData.prepareWorkExperienceEdit(req.body, local, company);
        const talentWhere = await TalentWorkExperienceDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['workExperience._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentWorkExperienceDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 20/10/2021
     * @param {String} id Talent user id
     * @param {Object} updateData Prepared data for update
     * @return {Object} userDetails Updated talent object
     */
    static async updateTalentData (where, updateData) {
        return await Talent.findOneAndUpdate(where, updateData, { new: true });
    }

    /**
     * @desc This function is being used to get update talent where condition
     * @author CodeMonk
     * @since 20/10/2021
     * @param {ObjectId} userId user id of agency
     * @param {Number} role user role
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async getTalentwhere (userId, role, talentId, local) {
        const talentWhere = {
            userId
        };

        if (role === CONSTANTS.ROLE.AGENCY) {
            await TalentWorkExperienceDetailsService.checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local);
            talentWhere.userId = mongoose.Types.ObjectId(talentId);
        }

        return talentWhere;
    }

    /**
     * @desc This function is being used to check talent id belongs to agency
     * @author CodeMonk
     * @since 20/10/2021
     * @param {ObjectId} userId user id of agency
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async checkAgencyCanUpdateOnBehalfOfTalent (talentId, userId, local) {
        await TalentPrepareEditData.checkTalentId(talentId, local);

        const userDetails = await User.findOne({
            _id: mongoose.Types.ObjectId(talentId)
        }, { email: 1 });

        if (!userDetails) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'User'), 400);
        }

        const talentUserDetails = await AgencyTalent.findOne({
            agencyId: userId,
            'talents.email': userDetails.email
        });

        if (!talentUserDetails) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Talent Details'), 400);
        }
    }
}

module.exports = TalentWorkExperienceDetailsService;
