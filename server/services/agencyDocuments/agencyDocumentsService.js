const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyDocumentValidator = require('./agencyDocumentsValidator');
const UploadService = require('../../util/uploadService');

/**
 * Class represents services for user document documents.
 */
class AgencyDocumentService {
    /**
   * @desc This function is being used to upload agency documents
   * @author Innovify
   * @since 01/09/2020
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
    static async uploadAgencyDocuments (req, user, local) {
        const fileDetails = await AgencyDocumentService.getFileDetails(req.files, user._id);
        const isUpdateDataEmpty = _.isEmpty(fileDetails.updateData);
        if (!isUpdateDataEmpty) {
            const Validator = new AgencyDocumentValidator(null, local);
            await Validator.validateAgencyDocumentUpload(fileDetails.file);
            await UploadService.uploadFile(fileDetails.file, fileDetails.path);

            await Agency.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: fileDetails.updateData
            });
            return fileDetails.returnData;
        } else {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'File key'), 400);
        }
    }

    /**
     * @desc This function is used to get which file is uploaded for agency documents
     * @since 01/09/2020
     * @param {Object} files files
     * @author Innovify
     */
    static async getFileDetails (files, id) {
        let file;
        let name;
        let fileName = '';
        const updateData = {};
        let returnData = {};
        const path = `${process.env.NODE_ENV}-documents/${id}`;
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}`;

        if (_.has(files, 'idProof0')) {
            file = files.idProof0[0];
            name = 'idProof0';
            fileName = file.originalname;
            updateData['directorDocuments.0.idProofUrl'] = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                idProofUrl0: `${s3Link}/${path}/${name}/${fileName}`
            };

        } else if (_.has(files, 'addressProof0')) {
            file = files.addressProof0[0];
            name = 'addressProof0';
            fileName = file.originalname;
            updateData['directorDocuments.0.addressProofUrl'] = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                addressProofUrl0: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'idProof1')) {
            file = files.idProof1[0];
            name = 'idProof1';
            fileName = file.originalname;
            updateData['directorDocuments.1.idProofUrl'] = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                idProofUrl1: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'addressProof1')) {
            file = files.addressProof1[0];
            name = 'addressProof1';
            fileName = file.originalname;
            updateData['directorDocuments.1.addressProofUrl'] = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                addressProofUrl1: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'companyIncorporationCertificateUrl')) {
            file = files.companyIncorporationCertificateUrl[0];
            name = 'companyIncorporationCertificateUrl';
            fileName = file.originalname;
            updateData.incorporationCertificateUrl = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                incorporationCertificateUrl: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'companyTaxRegistrationCertificateUrl')) {
            file = files.companyTaxRegistrationCertificateUrl[0];
            name = 'companyTaxRegistrationCertificateUrl';
            fileName = file.originalname;
            updateData.taxRegistrationCertificateUrl = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                taxRegistrationCertificateUrl: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'utilityBillDocumentUrl')) {
            file = files.utilityBillDocumentUrl[0];
            name = 'utilityBillDocumentUrl';
            fileName = file.originalname;
            updateData.utilityBillDocumentUrl = `${s3Link}/${path}/${name}/${fileName}`;
            returnData = {
                utilityBillDocumentUrl: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else {
            // Do Nothing
        }

        return {
            file,
            path: `${path}/${name}/${fileName}`,
            returnData,
            updateData
        };
    }

    /**
     * @desc This function is being used to delete agency documents
     * @author Innovify
     * @since 01/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteAgencyDocuments (req, user, local) {
        const Validator = new AgencyDocumentValidator(req.body, local);
        await Validator.validateAgencyDocumentDelete();

        const fileName = `${process.env.NODE_ENV}-documents/${user._id}/${req.body.document}`;
        await UploadService.deleteObject(fileName);
        const data = AgencyDocumentService.prepareDeleteData(req.body.document, '');

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: data.updateData
        });
    }

    /**
    * @desc This function is used to prepare uploaded documents key
    * @since 01/09/2020
    * @param {Object} input input
    * @param {String} filePath filePath
    * @author Innovify
    */
    static prepareDeleteData (input, filePath) {
        let updateData = {};
        let returnData = {};
        switch (input) {
            case 'idProof0':
                updateData['directorDocuments.0.idProofUrl'] = filePath;
                returnData = {
                    idProofUrl0: filePath
                };
                break;
            case 'addressProof0':
                updateData['directorDocuments.0.addressProofUrl'] = filePath;
                returnData = {
                    addressProof0: filePath
                };
                break;
            case 'idProof1':
                updateData['directorDocuments.1.idProofUrl'] = filePath;
                returnData = {
                    idProof1: filePath
                };
                break;
            case 'addressProof1':
                updateData['directorDocuments.1.addressProofUrl'] = filePath;
                returnData = {
                    addressProof1: filePath
                };
                break;
            case 'companyIncorporationCertificateUrl':
                updateData = {
                    'incorporationCertificateUrl': filePath
                };
                returnData = {
                    incorporationCertificateUrl: filePath
                };
                break;
            case 'companyTaxRegistrationCertificateUrl':
                updateData = {
                    'taxRegistrationCertificateUrl': filePath
                };
                returnData = {
                    vatRegistrationCertificateUrl: filePath
                };
                break;
            case 'utilityBillDocumentUrl':
                updateData = {
                    utilityBillDocumentUrl: filePath
                };
                returnData = {
                    utilityBillDocumentUrl: filePath
                };
                break;
        }

        return {
            updateData,
            returnData
        };
    }
}

module.exports = AgencyDocumentService;
