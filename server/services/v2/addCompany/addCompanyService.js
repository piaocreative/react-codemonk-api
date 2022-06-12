const Company = require('../../../models/company.model')
const AddCompanyValidator = require('./addCompanyValidator');
const UploadService = require('../../../util/uploadService');

class AddCompanyService {

    static async addCollegeOrUniversity(req, local, type) {
        const Validator = new AddCompanyValidator(req.file, local);

        const name = req.body.collegeName;
        const country = req.body.country;

        await Validator.companyName(name);
        await Validator.country(country);
        await Company.findOneAndUpdate({ name: name, country: country }, {
            name: req.body.collegeName, country: req.body.country, type
        }, {
            upsert: true, setDefaultsOnInsert: true
        })


        if (req.file) {
            const certification = await Company.findOne({ name: req.body.collegeName, country: req.body.country }).lean()
            const fileName = `${process.env.NODE_ENV}/companies/${certification._id}`;
            await Validator.validateLogo();
            await UploadService.uploadFile(req.file, fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            await Company.updateOne({ name: req.body.collegeName, country: req.body.country }, { logo: filePath })
        }

        return await Company.findOne({ name: req.body.collegeName, country: req.body.country }).lean();
    }

    static async addCompany(req, local) {

        const name = req.body.employer;
        const country = req.body.country;
        const file = req.file;
        return await AddCompanyService.getAddedOrUpdatedCompany(name, country, file, local);
    }

    static async getAddedOrUpdatedCompany(name, country, file, local) {
        const Validator = new AddCompanyValidator(file, local);
        await Validator.companyName(name);
        await Validator.country(country);
        
        await Company.findOneAndUpdate({ name: name, country: country }, {
            name: name, country: country
        }, {
            upsert: true, setDefaultsOnInsert: true
        });
        if (file) {
            const company = await Company.findOne({ name: name, country: country }).lean();
            const fileName = `${process.env.NODE_ENV}/companies/${company._id}`;
            await Validator.validateLogo();
            await UploadService.uploadFile(file, fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            await Company.updateOne({ name: name, country: country }, { logo: filePath });
        }
        return await Company.findOne({ name: name, country: country }).lean();
    }
}

module.exports = AddCompanyService