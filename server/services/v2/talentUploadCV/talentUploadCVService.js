const fs = require('fs');
const got = require('got');
const User = require('../../../models/user.model');
const Talent = require('../../../models/talent.model');
const TalentUploadCVValidator = require('./talentUploadCVValidator');
const Utils = require('../../../util/utilFunctions');
const UploadService = require('../../../util/uploadService');
const AddCompanyService = require('../addCompany/addCompanyService');
const CertificationService = require('../talentCertificationDetails/certificationService');

/**
 * Class represents services for talent upload CV
 */
class TalentUploadCVService {

    /**
     * @desc This function is being used to talent upload CV
     * @author CodeMonk
     * @since 27/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadTalentCV(req, user, local) {
        CONSOLE_LOGGER.info('UploadTalentCV - Start uploading CV with  UserID: %s ', user._id);

        const Validator = new TalentUploadCVValidator(null, local);
        await Validator.validateUploadCVFile(req.file);
        CONSOLE_LOGGER.info('UploadTalentCV - Successfully validated CV with  UserID: %s ', user._id);

        const userId = user._id;


        const fileName = `${process.env.NODE_ENV}/talent_cv/${userId}`;

        await UploadService.uploadFile(req.file, fileName);
        const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
        const uploadedCV = {
            talentCvUrl: filePath
        };

        console.log(uploadedCV);

        CONSOLE_LOGGER.info('UploadTalentCV - Upload file to Sovren with  UserID: %s, Email ID : %s ', user._id, user.email);

        const parsedData = await TalentUploadCVService.uploadTalentCVSovren(req.file, user.email);
        CONSOLE_LOGGER.info('UploadTalentCV - Successfully uploaded file to Sovren with  UserID: %s, Email ID : %s ', user._id, user.email);

        const mappedData = TalentUploadCVService.mapData(parsedData.Resume.StructuredXMLResume);
        const userUpdate = {
            firstName: (mappedData.firstName) ? mappedData.firstName : undefined,
            lastName: (mappedData.lastName) ? mappedData.lastName : undefined,
            phoneNumber: (mappedData.phoneNumber) ? mappedData.phoneNumber : undefined,
            countryCode: (mappedData.countryCode) ? mappedData.countryCode : undefined
        };
        CONSOLE_LOGGER.info('UploadTalentCV - Updating user with  UserID: %s, Email ID : %s ', user._id, user.email);
        console.log(userUpdate);
        await User.updateOne({
            _id: userId
        }, {
            $set: userUpdate
        });



        if (mappedData.workExperience && Array.isArray(mappedData.workExperience)) {
            for (var i = 0; i < mappedData.workExperience.length; i++) {
                try {
                    if (mappedData.workExperience[i].employer && mappedData.workExperience[i].country) {
                        const company = await AddCompanyService.getAddedOrUpdatedCompany(mappedData.workExperience[i].employer, mappedData.workExperience[i].country, undefined, local)
                        if (company && company.logo) {
                            mappedData.workExperience[i].logo = company.logo
                        }
                    }
                } catch (e) {
                    console.log(`UploadTalentCV - Updating user with  UserID: ${user._id}, Email ID : ${user.email}, Work Experience Index: ${i}, Work Experience: ${mappedData.workExperience[i]}`,e);
                }
            }
        }

        if (mappedData.certificateDetails && Array.isArray(mappedData.certificateDetails)) {
            for (var i = 0; i < mappedData.certificateDetails.length; i++) {
                try {
                    if (mappedData.certificateDetails[i].name) {
                        const certification = await CertificationService.getCertification(mappedData.certificateDetails[i].name)
                        if (certification && certification.logo) {
                            mappedData.certificateDetails[i].logo = certification.logo
                        }

                        if (certification && certification.issuedBy) {
                            mappedData.certificateDetails[i].issuedBy = certification.issuedBy
                        }
                    }
                } catch (e) {
                    console.log(`UploadTalentCV - Updating user with  UserID: ${user._id}, Email ID : ${user.email}, Certification Index: ${i}, Certification: ${mappedData.certificateDetails[i]}`,e);
                }
            }
        }

        await Talent.updateOne({
            userId: userId
        }, {
            $set: { ...mappedData, ...uploadedCV }
        });
    }

    static async uploadTalentCVSovren(file, userId) {
        if (process.env.NODE_ENV !== 'testing') {
            const postData = {
                'DocumentAsBase64String': file.buffer.toString('base64'),
                'RevisionDate': MOMENT().format('YYYY-MM-DD'),
                'OutputCandidateImage': false,
                'IndexingOptions': {
                    IndexId: 'codemonk',
                    DocumentId: userId
                }
            };

            const { body } = await got.post(CONSTANTS.SOVERN_PARSE_URL, {
                json: postData,
                headers: {
                    'Sovren-AccountId': process.env.SOVERN_ACCOUNT_ID,
                    'Sovren-ServiceKey': process.env.SOVERN_SERVICE_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                responseType: 'json'
            });

            if (body.Value.ParsedDocument) {
                return JSON.parse(body.Value.ParsedDocument);
            } else {
                return false;
            }
        } else {
            var filePath = './test/mock-data/new_resume_001.json';
            var buffer = fs.readFileSync(filePath);
            var base64Doc = buffer.toString();
            return JSON.parse(base64Doc);
        }
    }

    static mapData(parsedDocJson) {
        const mappedObject = {};
        for (const element in parsedDocJson) {
            if (element) {
                Object.assign(mappedObject, TalentUploadCVService.elementMapping(element, parsedDocJson[element]));
            }
        }
        return mappedObject;
    }
    static elementMapping(element, elementObj) {
        let object = {};
        switch (element) {
            case 'ContactInfo':
                object = TalentUploadCVService.addressMapping(elementObj);
                break;
            case 'ExecutiveSummary':
                object.professionalSummary = elementObj;
                break;
            case 'EmploymentHistory':
                object = TalentUploadCVService.experienceMapping(elementObj.EmployerOrg);
                break;
            case 'EducationHistory':
                object = TalentUploadCVService.educationMapping(elementObj.SchoolOrInstitution);
                break;
            case 'LicensesAndCertifications':
                object = TalentUploadCVService.certificationMapping(elementObj.LicenseOrCertification);
                break;
            case 'Languages':
                object = TalentUploadCVService.languageMapping(elementObj.Language);
                break;

            default:
        }

        return object;

    }
    static addressMapping(obj) {
        const addressObject = {};
        obj.ContactMethod && obj.ContactMethod.forEach(ele => {
            if (ele.PostalAddress) {
                let countryPhoneCode = (ele.PostalAddress.CountryCode)
                    ? Utils.getCountryNameFromISO2(ele.PostalAddress.CountryCode) : '';
                if (countryPhoneCode) {
                    countryPhoneCode = countryPhoneCode.phoneCode;
                }
                addressObject.postCode = ele.PostalAddress.PostalCode;
                addressObject.countryCode = countryPhoneCode;
                addressObject.city = (ele.PostalAddress.Region) ? ele.PostalAddress.Region.join(',') : undefined;
                addressObject.addressLineOne =
                    (ele.PostalAddress.DeliveryAddress && ele.PostalAddress.DeliveryAddress.AddressLine) ?
                        ele.PostalAddress.DeliveryAddress.AddressLine[0] : undefined;
                addressObject.addressLineTwo =
                    (ele.PostalAddress.DeliveryAddress && ele.PostalAddress.DeliveryAddress.AddressLine) ?
                        ele.PostalAddress.DeliveryAddress.AddressLine[1] : undefined;
            }
            if (ele.Telephone) {
                addressObject.phoneNumber = ele.Telephone.FormattedNumber;
            }
            if (ele.Use === 'linkedIn') {
                addressObject.linkedInUrl = ele.InternetWebAddress;
            }
        });

        if (obj.PersonName) {
            addressObject.firstName = obj.PersonName.GivenName;
            addressObject.lastName = obj.PersonName.FamilyName;
        }

        return addressObject;
    }

    static experienceMapping(obj) {
        const workExperienceObj = {
            workExperience: []
        };
        obj.forEach(ele => {
            ele.PositionHistory && ele.PositionHistory.forEach(exper => {
                let countryCode;
                exper.OrgInfo && exper.OrgInfo.forEach(location => {
                    countryCode = location.PositionLocation ? location.PositionLocation.CountryCode : undefined;
                });
                let country = countryCode && Utils.getCountryNameFromISO2(countryCode);
                if (country) {
                    country = country.name;
                }
                workExperienceObj.workExperience.push({
                    jobTitle: exper.Title,
                    employer: exper.OrgName.OrganizationName,
                    shortDescription: exper.Description,
                    startDate: exper.StartDate ? exper.StartDate.YearMonth : '',
                    endDate: exper.EndDate ? exper.EndDate.YearMonth : '',
                    country
                });
            });
        });

        return workExperienceObj;
    }
    static educationMapping(obj) {
        const educationDetailsObject = {
            educationDetails: []
        };

        obj.forEach(edu => {
            let title;
            let startYear;
            let endYear;

            edu.Degree && edu.Degree.forEach(deg => {
                title = deg.DegreeName;
                deg.DatesOfAttendance && deg.DatesOfAttendance.forEach(dates => {
                    startYear = (dates.StartDate) ? dates.StartDate.Year : '';
                    endYear = (dates.EndDate) ? dates.EndDate.Year : '';
                });
            });
            let schoolName;
            edu.School && edu.School.forEach(school => {
                schoolName = school.SchoolName;
            });
            educationDetailsObject.educationDetails.push({
                collegeName: schoolName,
                degreeTitle: title,
                startYear,
                endYear
            });
        });
    }

    static certificationMapping(obj) {
        return {
            certificateDetails: obj.map(certificate => {
                return {
                    name: certificate.Name
                };
            })
        };
    }

    static languageMapping(obj) {
        return {
            language: obj.map(lang => {
                return {
                    name: lang.LanguageCode,
                    rate: 0
                };
            })
        };
    }

    static skillsMapping(obj) {
        const skillsObject = {
            skills: []
        };

        return skillsObject;
    }
}

module.exports = TalentUploadCVService;
