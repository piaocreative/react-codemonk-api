const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const User = require('../../../models/user.model');
const AgencyTalent = require('../../../models/agencyTalent.model');
const AddCompanyService = require('../addCompany/addCompanyService');
const utils = require('../../../util/utilFunctions');

/**
 * Class represents services for Talent Education Details.
 */
class TalentEducationDetailsService {

    /**
     * @desc This function is being used to add talent education at beginning of education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentEducationDetails (req, user, local) {
        const company = await AddCompanyService.addCollegeOrUniversity(req, local, 'College/University');
        const updateData = await TalentPrepareEditData.prepareEducationAdd(req.body, local, company);
        const talentWhere = await TalentEducationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        const updatedData = await TalentEducationDetailsService.updateTalentData(talentWhere, updateData);

        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.EDUCATION_DETAIL);
        if (signupStep) {
            await Talent.updateOne(talentWhere, { signupStep });
        }
        const oldUserStep = user.signupStep;
        await utils.profileEditLog(updatedData, oldUserStep);
        await utils.profileCompleteLog(updatedData, oldUserStep);

        return updatedData;
    }

    /**
     * @desc This function is being used to delete talent education from object education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentEducationDetails (req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEducationDelete(req.body, local);
        const talentWhere = await TalentEducationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEducationDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a education from talent object education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentEducationDetails (req, user, local) {
        const company = await AddCompanyService.addCollegeOrUniversity(req, local, 'College/University');
        const updateData = await TalentPrepareEditData.prepareEducationEdit(req.body, local, company);
        const talentWhere = await TalentEducationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['educationDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentEducationDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 18/10/2021
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
     * @since 18/10/2021
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
            await TalentEducationDetailsService.checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local);
            talentWhere.userId = mongoose.Types.ObjectId(talentId);
        }

        return talentWhere;
    }

    /**
     * @desc This function is being used to check talent id belongs to agency
     * @author CodeMonk
     * @since 18/10/2021
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

module.exports = TalentEducationDetailsService;
