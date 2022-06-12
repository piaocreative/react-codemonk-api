const TalentPayDetailsValidator = require('../talentPayDetails/talentPayDetailsValidator');
const UserDocumentValidator = require('../../userDocuments/userDocumentsValidator');
const UploadService = require('../../../util/uploadService');
const UserDocumentsService = require('../../userDocuments/userDocumentsService');

/**
 * Class represents services for Talent prepare update object for Edit talent details.
 */
class TalentPrepareEditData {


    /**
     * @desc This function is being used to prepare talent document details to update the data
     * @author CodeMonk
     * @since 30/10/2021
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareUploadDocs (files, data, user, local) {
        const billingValidator = new TalentPayDetailsValidator(data, local);
        const documentValidator = new UserDocumentValidator(data, local);
        const updateData = {};
        const path = `${process.env.NODE_ENV}-documents/${user._id}`;
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}`;
        if (data.billingType) {
            billingValidator.billingType(data.billingType);
        }
        // Id Proof
        if (_.has(files, 'idProof')) {
            await documentValidator.validateUserDocumentUpload(files.idProof[0], local);
            const idProofPath = `${path}/idProof/${files.idProof[0].originalname}`;
            await UploadService.uploadFile(files.idProof[0], idProofPath);
            updateData.idProofUrl = `${s3Link}/${idProofPath}`;
        }

        // Address proof
        if (_.has(files, 'addressProof')) {
            await documentValidator.validateUserDocumentUpload(files.addressProof[0], local);
            const addressProof = `${path}/addressProof/${files.addressProof[0].originalname}`;
            await UploadService.uploadFile(files.addressProof[0], addressProof);
            updateData.addressProofUrl = `${s3Link}/${addressProof}`;
        }

        if (data.billingType && data.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            _.merge(updateData, await UserDocumentsService.uploadCompanyDocuments(files, user, local));
        }
        return {
            $set: updateData
        };
    }
}

module.exports = TalentPrepareEditData;
