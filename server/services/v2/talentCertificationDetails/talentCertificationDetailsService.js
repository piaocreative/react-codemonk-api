const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const CertificationService = require('./certificationService');
const User = require('../../../models/user.model');
const AgencyTalent = require('../../../models/agencyTalent.model');

/**
 * Class represents services for Talent Certification Details.
 */
class TalentCertificationDetailsService {
    
    /**
     * @desc This function is being used to add talent certificate
     *  at beginning of certificate array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentCertificateDetails(req, user, local) {
        const certification = await CertificationService.addCertification(req,local);

        const updateData = await TalentPrepareEditData.prepareCertificateAdd(req.body, local,certification);
        const talentWhere = await TalentCertificationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentCertificationDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to delete talent certificate
     *  from object certificate array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentCertificateDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareCertificateDelete(req.body, local);
        const talentWhere = await TalentCertificationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentCertificationDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a certificate
     *  from talent object certificate array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentCertificateDetails(req, user, local) {
        const certification = await CertificationService.addCertification(req,local);
        const updateData = await TalentPrepareEditData.prepareCertificateEdit(req.body, local, certification);
        const talentWhere = await TalentCertificationDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['certificateDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentCertificationDetailsService.updateTalentData(talentWhere, updateData);
    }



    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 18/10/2020
     * @param {String} id Talent user id
     * @param {Object} updateData Prepared data for update
     * @return {Object} userDetails Updated talent object
     */
    static async updateTalentData(where, updateData) {
        return await Talent.findOneAndUpdate(where, updateData, { new: true });
    }

    /**
     * @desc This function is being used to get update talent where condition
     * @author CodeMonk
     * @since 18/10/2020
     * @param {ObjectId} userId user id of agency
     * @param {Number} role user role
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async getTalentwhere(userId, role, talentId, local) {
        const talentWhere = {
            userId
        };

        if (role === CONSTANTS.ROLE.AGENCY) {
            await TalentCertificationDetailsService.checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local);
            talentWhere.userId = mongoose.Types.ObjectId(talentId);
        }

        return talentWhere;
    }

    /**
     * @desc This function is being used to check talent id belongs to agency
     * @author Innovify
     * @since 24/11/2020
     * @param {ObjectId} userId user id of agency
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local) {
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

module.exports = TalentCertificationDetailsService;
