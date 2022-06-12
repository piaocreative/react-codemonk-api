const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const Client = require('../../models/client.model');
const UserDocumentValidator = require('./userDocumentsValidator');
const UploadService = require('../../util/uploadService');

/**
 * Class represents services for user document documents.
 */
class UserDocumentService {
    /**
   * @desc This function is being used to upload pay documents
   * @author Innovify
   * @since 12/06/2020
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
    static async uploadPayDocuments (req, user, local) {
        const fileDetails = await UserDocumentService.getFileDetails(req.files, user._id);
        const isUpdateDataEmpty = _.isEmpty(fileDetails.updateData);
        if (!isUpdateDataEmpty) {
            const Validator = new UserDocumentValidator(null, local);
            await Validator.validateUserDocumentUpload(fileDetails.file[0]);
            await UploadService.uploadFile(fileDetails.file[0], fileDetails.path);
            if (user.role === CONSTANTS.ROLE.TALENT) {
                await Talent.updateOne({
                    userId: mongoose.Types.ObjectId(user._id)
                }, {
                    $set: fileDetails.updateData
                });
            } else if (user.role === CONSTANTS.ROLE.CLIENT) {
                await Client.updateOne({
                    userId: mongoose.Types.ObjectId(user._id)
                }, {
                    $set: fileDetails.updateData
                });
            }

            return fileDetails.returnData;
        } else {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'File'), 400);
        }
    }

    /**
     * @desc This function is used to get which file is uploaded for user documents
     * @since 12/06/2020
     * @param {Object} files files
     * @author Innovify
     */
    static async getFileDetails (files, id) {
        let file;
        let name;
        let fileName = '';
        let updateData = {};
        let returnData = {};
        const path = `${process.env.NODE_ENV}-documents/${id}`;
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}`;
        if (_.has(files, 'idProof')) {
            file = files.idProof;
            name = 'idProof';
            fileName = file[0].originalname;
            returnData = updateData = {
                idProofUrl: `${s3Link}/${path}/${name}/${fileName}`
            };
        } else if (_.has(files, 'addressProof')) {
            file = files.addressProof;
            name = 'addressProof';
            fileName = file[0].originalname;
            returnData = updateData = {
                addressProofUrl: `${s3Link}/${path}/${name}/${fileName}`
            };

        } else if (_.has(files, 'companyIncorporationCertificateUrl')) {
            file = files.companyIncorporationCertificateUrl;
            name = 'companyIncorporationCertificateUrl';
            fileName = file[0].originalname;
            updateData = {
                'billing.companyDocument.incorporationCertificateUrl': `${s3Link}/${path}/${name}/${fileName}`
            };
            returnData = {
                billing: {
                    companyDocument: {
                        incorporationCertificateUrl: `${s3Link}/${path}/${name}/${fileName}`
                    }
                }
            };
        } else if (_.has(files, 'companyVatRegistrationCertificateUrl')) {
            file = files.companyVatRegistrationCertificateUrl;
            name = 'companyVatRegistrationCertificateUrl';
            fileName = file[0].originalname;
            updateData = {
                'billing.companyDocument.vatRegistrationCertificateUrl': `${s3Link}/${path}/${name}/${fileName}`
            };
            returnData = {
                billing: {
                    companyDocument: {
                        vatRegistrationCertificateUrl: `${s3Link}/${path}/${name}/${fileName}`
                    }
                }
            };
        } else if (_.has(files, 'companyInsuranceDocumentUrl')) {
            file = files.companyInsuranceDocumentUrl;
            name = 'companyInsuranceDocumentUrl';
            fileName = file[0].originalname;
            updateData = {
                'billing.companyDocument.insuranceDocumentUrl': `${s3Link}/${path}/${name}/${fileName}`
            };
            returnData = {
                billing: {
                    companyDocument: {
                        insuranceDocumentUrl: `${s3Link}/${path}/${name}/${fileName}`
                    }
                }
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
     * @desc This function is being used to delete pay documents
     * @author Innovify
     * @since 11/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteuserDocument (req, user, local) {
        const Validator = new UserDocumentValidator(req.body, local);
        await Validator.validateUserDocumentDelete();

        const fileName = `${process.env.NODE_ENV}-documents/${user._id}/${req.body.document}`;
        await UploadService.deleteObject(fileName);
        const data = UserDocumentService.prepareDeleteData(req.body.document, '');
        await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: data.updateData
        });
    }

    /**
    * @desc This function is used to prepare uploaded documents key
    * @since 12/06/2020
    * @param {Object} input input
    * @param {String} filePath filePath
    * @author Innovify
    */
    static prepareDeleteData (input, filePath) {
        let updateData = {};
        let returnData = {};
        switch (input) {
            case 'idProof':
                returnData = updateData = {
                    idProofUrl: filePath
                };
                break;
            case 'addressProof':
                returnData = updateData = {
                    addressProofUrl: filePath
                };
                break;
            case 'companyIncorporationCertificateUrl':
                updateData = {
                    'billing.companyDocument.incorporationCertificateUrl': filePath
                };
                returnData = {
                    billing: {
                        companyDocument: {
                            incorporationCertificateUrl: filePath
                        }
                    }
                };
                break;
            case 'companyVatRegistrationCertificateUrl':
                updateData = {
                    'billing.companyDocument.vatRegistrationCertificateUrl': filePath
                };
                returnData = {
                    billing: {
                        companyDocument: {
                            vatRegistrationCertificateUrl: filePath
                        }
                    }
                };
                break;
            case 'companyInsuranceDocumentUrl':
                updateData = {
                    'billing.companyDocument.insuranceDocumentUrl': filePath
                };
                returnData = {
                    billing: {
                        companyDocument: {
                            insuranceDocumentUrl: filePath
                        }
                    }
                };
                break;
        }

        return {
            updateData,
            returnData
        };
    }

    static async uploadCompanyDocuments (files, user, local) {
        const documentsData = {};
        const path = `${process.env.NODE_ENV}-documents/${user._id}`;
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}`;
        const Validator = new UserDocumentValidator(null, local);
        // companyIncorporationCertificateUrl
        if (_.has(files, 'companyIncorporationCertificateUrl')) {
            await Validator.validateUserDocumentUpload(files.companyIncorporationCertificateUrl[0]);
            const companyIncorporationCertificateUrl
                = `${path}/companyIncorporationCertificateUrl/${files.companyIncorporationCertificateUrl[0].originalname}`;
            await UploadService.uploadFile(files.companyIncorporationCertificateUrl[0], companyIncorporationCertificateUrl);
            documentsData['billing.companyDocument.incorporationCertificateUrl'] = `${s3Link}/${companyIncorporationCertificateUrl}`;
        }

        // companyVatRegistrationCertificateUrl
        if (_.has(files, 'companyVatRegistrationCertificateUrl')) {
            await Validator.validateUserDocumentUpload(files.companyVatRegistrationCertificateUrl[0]);
            const companyVatRegistrationCertificateUrl
                = `${path}/companyVatRegistrationCertificateUrl/${files.companyVatRegistrationCertificateUrl[0].originalname}`;
            await UploadService.uploadFile(files.companyVatRegistrationCertificateUrl[0], companyVatRegistrationCertificateUrl);
            documentsData['billing.companyDocument.vatRegistrationCertificateUrl'] = `${s3Link}/${companyVatRegistrationCertificateUrl}`;
        }

        // companyInsuranceDocumentUrl
        if (_.has(files, 'companyInsuranceDocumentUrl')) {
            await Validator.validateUserDocumentUpload(files.companyInsuranceDocumentUrl[0]);
            const companyInsuranceDocumentUrl
                = `${path}/companyInsuranceDocumentUrl/${files.companyInsuranceDocumentUrl[0].originalname}`;
            await UploadService.uploadFile(files.companyInsuranceDocumentUrl[0], companyInsuranceDocumentUrl);
            documentsData['billing.companyDocument.insuranceDocumentUrl'] = `${s3Link}/${companyInsuranceDocumentUrl}`;
        }

        return documentsData;
    }

}

module.exports = UserDocumentService;
