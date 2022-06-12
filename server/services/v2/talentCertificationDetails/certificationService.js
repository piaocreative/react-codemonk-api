const Certification = require('../../../models/certification.model')
const CertificationValidator = require('./certificationValidator');
const UploadService = require('../../../util/uploadService');

class CertificationService {

    static async addCertification(req, local) {

        await Certification.findOneAndUpdate({ name: req.body.name }, {
            issuedBy: req.body.issuedBy
        }, {
            upsert: true, setDefaultsOnInsert: true
        })


        if (req.file) {
            const certification = await Certification.findOne({ name: req.body.name }).lean()
            const fileName = `${process.env.NODE_ENV}/certifications/${certification._id}`;
            const Validator = new CertificationValidator(req.file, local);
            await Validator.validateLogo();
            await UploadService.uploadFile(req.file, fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            await Certification.updateOne({ name: req.body.name }, {
                logo: filePath
            })
        }

        return await Certification.findOne({ name: req.body.name }).lean();
    }

    static async getCertification(name) {
        return await Certification.findOne({ name }).lean();
    }
}

module.exports = CertificationService