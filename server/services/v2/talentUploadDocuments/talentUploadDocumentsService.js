const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const EngageBay = require('../../engageBay/engageBay');
const utils = require('../../../util/utilFunctions');

/**
 * Class represents services for Talent Upload documents Details.
 */
class TalentUploadDocumentsService {

    /**
     * @desc This function is being used to edit upload document that supplied in input
     * @author CodeMonk
     * @since 30/10/2021
     * @param {Object} req Request
     * @param {Object} user user details from middleware
     */
    static async uploadDocuments (req, user, local) {
        const updateData = await TalentPrepareEditData.prepareUploadDocs(req.files, req.body, user, local);

        const uploadedAllDocs = await TalentUploadDocumentsService.checkUploadAllDocs(user, updateData);
        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.UPLOAD_DOC);

        if (signupStep && uploadedAllDocs) {
            updateData.$set.signupStep = signupStep;
        }
        const updateDetails = await TalentUploadDocumentsService.updateTalentData({
            userId: mongoose.Types.ObjectId(user._id)
        }, updateData);

        if (!((user && user.signupStep && user.signupStep >= 7) || (!uploadedAllDocs))) {
            if (user.registerType === 'agency') {
                EngageBay.updateEngageBayContactTags(user.email, ['talent', 'active'], utils.getEngageBayContactProproperties(user));
            } else {
                EngageBay.updateEngageBayContactTags(user.email, ['talent', 'active'], utils.getEngageBayContactProproperties(user));
            }
        }

        const oldUserStep = user.signupStep;
        await utils.profileEditLog(updateDetails, oldUserStep);
        await utils.profileCompleteLog(updateDetails, oldUserStep);

        return updateDetails;
    }


    static async checkUploadAllDocs (user, updateData) {
        let uploadedIdProof = false;
        if ((user && user.idProofUrl) || (updateData && updateData.$set && updateData.$set.idProofUrl)) {
            uploadedIdProof = true;
        }

        let addressProofUrl = false;
        if ((user && user.addressProofUrl) || (updateData && updateData.$set && updateData.$set.addressProofUrl)) {
            addressProofUrl = true;
        }

        let incorporationCertificateUrl = !(user && user.billing && user.billing.type === CONSTANTS.BILLING_TYPES_COMPANY);
        if ((user && user.billing && user.billing.companyDocument && user.billing.companyDocument.incorporationCertificateUrl) || (updateData && updateData.$set && updateData.$set['billing.companyDocument.incorporationCertificateUrl'])) {
            incorporationCertificateUrl = true;
        }
        return uploadedIdProof && addressProofUrl && incorporationCertificateUrl;
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author Innovify
     * @since 22/06/2020
     * @param {String} id Talent user id
     * @param {Object} updateData Prepared data for update
     * @return {Object} userDetails Updated talent object
     */
    static async updateTalentData (where, updateData) {
        return await Talent.findOneAndUpdate(where, updateData, { new: true });
    }
}

module.exports = TalentUploadDocumentsService;
