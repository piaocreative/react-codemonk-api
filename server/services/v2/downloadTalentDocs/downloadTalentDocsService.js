const Talent = require('../../../models/talent.model');
const DownloadTalentDocsValidator = require('./downloadTalentDocsValidator');
const mongoose = require('mongoose');
const UploadService = require('../../../util/uploadService');

/**
 * @name DownloadTalentDocsService service
 */
class DownloadTalentDocsService {

    static async downloadTalentDocs (req, user, local) {
        const Validator = new DownloadTalentDocsValidator(null, local);
        await Validator.validateUserDocument(req.query.type);
        const talents = await Talent.aggregate([
            {
                $match: { userId: mongoose.Types.ObjectId(user._id) }
            },
            {
                $project: {
                    filePath: DownloadTalentDocsService.prepareFilePathData(req.query.type)
                }
            }
        ]);
        if (!talents || !talents.length || !talents[0].filePath) {
            await Validator.validateUserDocument('');
        }
        const t = talents[0];
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/`;

        const pdfPath = await UploadService.getSignedUrl(t.filePath.replace(s3Link, ''));
        return {
            pdfPath
        };
    }

    static prepareFilePathData (input) {
        let updateData = '';
        switch (input) {
            case 'idProof':
                updateData = '$idProofUrl';
                break;
            case 'addressProof':
                updateData = '$addressProofUrl';
                break;
            case 'companyIncorporationCertificateUrl':
                updateData = '$billing.companyDocument.incorporationCertificateUrl';
                break;
            case 'companyVatRegistrationCertificateUrl':
                updateData = '$billing.companyDocument.vatRegistrationCertificateUrl';
                break;
            case 'companyInsuranceDocumentUrl':
                updateData = '$billing.companyDocument.insuranceDocumentUrl';
                break;
        }
        return updateData;
    }

}

module.exports = DownloadTalentDocsService;
