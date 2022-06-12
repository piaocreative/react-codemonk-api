const mongoose = require('mongoose');
const Utils = require('../../util/utilFunctions');
const TalentBasicProfileValidator = require('../talentBasicProfile/talentBasicProfileValidator');
const TalentProfessinalDetailsValidator = require('../talentProfessionalDetails/talentProfessionalProfileValidator');
const TalentPayDetailsValidator = require('../talentPayDetails/talentPayDetailsValidator');
const TalentPayDetailsService = require('../talentPayDetails/talentPayDetailsService');
const TalentProjectDetailsValidator = require('../talentProjectDetails/talentProjectDetailsValidator');
const TalentPreferenceDetailsValidator = require('../talentPreferenceDetails/talentPreferenceDetailsValidator');
const TalentEducationDetailsValidator = require('../talentEducationDetails/talentEducationDetailsValidator');
const TalentWorkExperienceDetailsValidator = require('../talentWorkExperienceDetails/talentWorkExperienceDetailsValidator');
const UserDocumentValidator = require('../userDocuments/userDocumentsValidator');
const UploadService = require('../../util/uploadService');
const UserDocumentsService = require('../userDocuments/userDocumentsService');

/**
 * Class represents services for Talent prepare update object for Edit talent details.
 */
class TalentPrepareEditData {
    /**
     * @desc This function is being used to prepare talent personal details to update data
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareEditProfileData(data, local) {
        const TalentBasicValidator = new TalentBasicProfileValidator(data, local);
        const TalentProfessionalValidator = new TalentProfessinalDetailsValidator(data, local);
        await TalentBasicValidator.firstName(data.firstName);
        await TalentBasicValidator.lastName(data.lastName);
        await TalentBasicValidator.countryCode(data.countryCode);
        await TalentBasicValidator.phoneNumber(data.phoneNumber);
        TalentBasicValidator.checkDate(data.dob, 'DOB');
        await TalentBasicValidator.gender(data.gender);
        await TalentBasicValidator.postcode(data.postcode);
        await TalentBasicValidator.timeZone(data.timeZone);
        await TalentBasicValidator.addressLineOne(data.addressLineOne);
        await TalentBasicValidator.city(data.city);
        await TalentBasicValidator.country(data.country);
        await TalentProfessionalValidator.primaryRole(data.primaryRole);
        await TalentProfessionalValidator.yearsOfExperience(data.yearsOfExperience);

        data.dob = Utils.getDateFromDDMMYYY(data.dob);

        return {
            talent: {
                $set: {
                    dob: data.dob,
                    gender: data.gender,
                    postcode: data.postcode,
                    timeZone: data.timeZone,
                    addressLineOne: data.addressLineOne,
                    addressLineTwo: (data.addressLineTwo) ? data.addressLineTwo : '',
                    city: data.city,
                    country: data.country,
                    primaryRole: data.primaryRole,
                    yearsOfExperience: data.yearsOfExperience,
                    experienceOrder: CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.yearsOfExperience)
                }
            },
            user: {
                $set: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    countryCode: data.countryCode,
                    phoneNumber: data.phoneNumber
                }
            }
        };
    }

    /**
     * @desc This function is being used to prepare talent professional summary brief for update
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareEditSummaryData(data, local) {
        const updateData = {};
        const TalentProfessionalValidator = new TalentProfessinalDetailsValidator(data, local);
        await TalentProfessionalValidator.professionalSummary(data.professionalSummary);
        updateData.professionalSummary = data.professionalSummary;
        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to prepare talent rate and currency for update
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareEditRate(data, user, local) {
        const updateData = {};
        const TalentPayValidator = new TalentPayDetailsValidator(data, local);
        await TalentPayValidator.checkActiveProject(user._id, user.proxyUser);
        TalentPayValidator.currency(data.currency);
        TalentPayValidator.ratePerHour(data.ratePerHour);
        updateData.currency = data.currency;
        updateData.ratePerHour = Utils.round(data.ratePerHour, 2);;
        updateData.ratePerDay = Utils.round(data.ratePerHour * 7.5, 2);
        updateData.ratePerMonth = Utils.round(data.ratePerHour * 157.5, 2);
        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to prepare talent skills details to update data
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareEditSkillsData(data, local) {
        const TalentProfessionalValidator = new TalentProfessinalDetailsValidator(data, local);
        const updateData = {};
        await TalentProfessionalValidator.skills(data.skills);
        updateData.skills = data.skills;
        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to prepare talent url details to update data
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareEditUrlData(data, local) {
        const TalentProfessionalValidator = new TalentProfessinalDetailsValidator(data, local);
        const updateData = {};
        TalentProfessionalValidator.linkedInUrl(data.linkedInUrl);
        TalentProfessionalValidator.gitHubUrl(data.gitHubUrl);
        TalentProfessionalValidator.stackOverFlowUrl(data.stackOverFlowUrl);
        TalentProfessionalValidator.dribbbleUrl(data.dribbbleUrl);
        TalentProfessionalValidator.behanceUrl(data.behanceUrl);
        TalentProfessionalValidator.otherWebsiteUrl(data.portfolioUrl);
        updateData.linkedInUrl = (data.linkedInUrl) ? data.linkedInUrl : '';
        updateData.gitHubUrl = (data.gitHubUrl) ? data.gitHubUrl : '';
        updateData.stackOverFlowUrl = (data.stackOverFlowUrl) ? data.stackOverFlowUrl : '';
        updateData.dribbbleUrl = (data.dribbbleUrl) ? data.dribbbleUrl : '';
        updateData.behanceUrl = (data.behanceUrl) ? data.behanceUrl : '';
        updateData.portfolioUrl = (data.portfolioUrl) ? data.portfolioUrl : '';

        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to validate and prepare talent project details to update
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectAdd(data, local) {
        const projectValidator = new TalentProjectDetailsValidator(data, local);
        await projectValidator.checkProjectName(data.name);
        await projectValidator.checkProjectURL(data.url);
        await projectValidator.checkProjectDescription(data.description);
        await projectValidator.checkProjectRole(data.role);
        await projectValidator.checkProjectEmployer(data.employer);
        await projectValidator.checkProjectIndustry(data.industry);
        //await projectValidator.checkProjectKeyAchievements(data.keyAchievements);
        await projectValidator.skills(data.skills);

        return {
            $push: {
                projectDetails: {
                    $each: [{
                        name: data.name,
                        url: (data.url) ? data.url : '',
                        description: data.description,
                        role: data.role,
                        skills: data.skills,
                        employer: data.employer,
                        industry: data.industry
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} data Project Id
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectDelete(data, local) {
        const projectValidator = new TalentProjectDetailsValidator(null, local);
        await projectValidator.checkId(data._id);
        return {
            $pull: {
                projectDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data Project Id
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectEdit(data, local) {
        const projectValidator = new TalentProjectDetailsValidator(null, local);
        await projectValidator.checkProjectName(data.name);
        await projectValidator.checkProjectURL(data.url);
        await projectValidator.checkProjectDescription(data.description);
        await projectValidator.checkProjectRole(data.role);
        await projectValidator.checkProjectEmployer(data.employer);
        await projectValidator.checkProjectIndustry(data.industry);
        //await projectValidator.checkProjectKeyAchievements(data.keyAchievements);
        await projectValidator.checkId(data._id);
        await projectValidator.skills(data.skills);

        return {
            $set: {
                'projectDetails.$.name': data.name,
                'projectDetails.$.url': (data.url) ? data.url : '',
                'projectDetails.$.description': data.description,
                'projectDetails.$.role': data.role,
                'projectDetails.$.skills': data.skills,
                'projectDetails.$.employer': data.employer,
                'projectDetails.$.industry': data.industry
            }
        };
    }

    /**
     * @desc This function is being used to prepare talent Preference details to update data
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePreferenceEdit(data, local) {
        const preferenceValidator = new TalentPreferenceDetailsValidator(data, local);
        const updateData = {};

        await preferenceValidator.industries(data.industries);
        await preferenceValidator.companyCultures(data.companyCultures);
        preferenceValidator.companyType(data.companyType);
        preferenceValidator.preferredProjectDuration(data.preferredProjectDuration);
        await preferenceValidator.teamPreference(data.teamPreference);
        await preferenceValidator.assignments(data.assignments);
        await preferenceValidator.workPreference(data.workPreference);

        updateData.industries = (data.industries && data.industries.length)
            ? data.industries : [];
        updateData.companyCultures = (data.companyCultures && data.companyCultures.length)
            ? data.companyCultures : [];
        updateData.companyType = (data.companyType) ? data.companyType : [];
        updateData.preferredProjectDuration = (data.preferredProjectDuration) ? data.preferredProjectDuration : [];
        updateData.teamPreference =
            (data.teamPreference && data.teamPreference.length) ? data.teamPreference : [];
        updateData.assignments =
            (data.assignments) && data.assignments.length ? data.assignments : [];
        updateData.workPreference = data.workPreference;

        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to prepare talent availability details to update data
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareAvailabilityEdit(data, local) {
        const availabilityValidator = new TalentPreferenceDetailsValidator(data, local);
        const updateData = {};
        await availabilityValidator.availability(data.availability);
        await availabilityValidator.unavailability(data.unavailability);
        updateData.availability = (data.availability) ? data.availability : false;
        updateData.unavailability = (data.unavailability) ? data.unavailability : [];
        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to validate and prepare talent education details to update
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareEducationAdd(data, local) {
        const educationValidator = new TalentEducationDetailsValidator(data, local);
        await educationValidator.checkEducationEach([data]);
        return {
            $push: {
                educationDetails: {
                    $each: [{
                        degreeLevel: data.degreeLevel,
                        degreeTitle: data.degreeTitle,
                        collegeName: data.collegeName,
                        country: data.country,
                        startYear: data.startYear,
                        endYear: data.endYear
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify education details based on the input operation
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data education Id
     * @return {Object}
     */
    static async prepareEducationDelete(data, local) {
        const educationValidator = new TalentEducationDetailsValidator(data, local);
        await educationValidator.checkId(data._id);
        return {
            $pull: {
                educationDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a education from talent object education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data education Id
     * @return {Object}
     */
    static async prepareEducationEdit(data, local) {
        const educationValidator = new TalentEducationDetailsValidator(null, local);
        await educationValidator.checkEducationEach([data]);
        return {
            $set: {
                'educationDetails.$.degreeLevel': data.degreeLevel,
                'educationDetails.$.degreeTitle': data.degreeTitle,
                'educationDetails.$.collegeName': data.collegeName,
                'educationDetails.$.country': data.country,
                'educationDetails.$.startYear': data.startYear,
                'educationDetails.$.endYear': data.endYear
            }
        };
    }


    /**
     * @desc This function is being used to common workExperience validation
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} data
     * @return {Object}
     */
    static async prepareWorkExperienceCommonValidation(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        workExperienceValidator.checkDate(data.startDate, 'Start date');
        workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.country(data.country);
        await workExperienceValidator.checkEmploymentType(data.employmentType);
        await workExperienceValidator.checkEmployer(data.employer);
        await workExperienceValidator.checkJobTitle(data.jobTitle);
        await workExperienceValidator.checkShortDescription(data.shortDescription);
    }

    /**
     * @desc This function is being used to validate and prepare talent work experience to update
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceAdd(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        await this.prepareWorkExperienceCommonValidation(data, local);
        const startDate = workExperienceValidator.checkDate(data.startDate, 'Start date');
        const endDate = workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.checkStartEndDate(startDate, endDate);
        return {
            $push: {
                workExperience: {
                    $each: [{
                        jobTitle: data.jobTitle,
                        employmentType: data.employmentType,
                        employer: data.employer,
                        country: data.country,
                        startDate: MOMENT(startDate).utc(),
                        endDate: MOMENT(endDate).utc(),
                        shortDescription: data.shortDescription,
                        isPresent: (typeof data.isPresent !== 'undefined') ? data.isPresent : false
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceDelete(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(null, local);
        await workExperienceValidator.checkId(data._id);
        return {
            $pull: {
                workExperience: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceEdit(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        await this.prepareWorkExperienceCommonValidation(data, local);
        const startDate = workExperienceValidator.checkDate(data.startDate, 'Start date');
        const endDate = workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.checkStartEndDate(startDate, endDate);
        await workExperienceValidator.checkId(data._id);
        return {
            $set: {
                'workExperience.$.jobTitle': data.jobTitle,
                'workExperience.$.employmentType': data.employmentType,
                'workExperience.$.employer': data.employer,
                'workExperience.$.country': data.country,
                'workExperience.$.startDate': MOMENT(startDate).utc(),
                'workExperience.$.endDate': MOMENT(endDate).utc(),
                'workExperience.$.shortDescription': data.shortDescription,
                'workExperience.$.isPresent': (typeof data.isPresent !== 'undefined') ? data.isPresent : false
            }
        };
    }

    /**
     * @desc This function is being used to validate and prepare certificate details to update
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareCertificateAdd(data, local) {

        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.certificateName(data.name);
        certificateValidator.checkDate(data.dateObtained, 'Date obtained');
        await certificateValidator.certificateIssuedBy(data.issuedBy);
        await certificateValidator.certificateId(data.certificateId);
        data.dateObtained = Utils.getDateFromDDMMYYY(data.dateObtained);

        return {
            $push: {
                certificateDetails: {
                    $each: [{
                        name: data.name,
                        dateObtained: data.dateObtained,
                        issuedBy: data.issuedBy,
                        certificateId: data.certificateId
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify certificate details based on the input operation
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} data certificate Id
     * @return {Object}
     */
    static async prepareCertificateDelete(data, local) {
        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.checkId(data._id);
        return {
            $pull: {
                certificateDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a certificate from talent object certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} data certificate Id
     * @return {Object}
     */
    static async prepareCertificateEdit(data, local) {
        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.certificateName(data.name);
        certificateValidator.checkDate(data.dateObtained, 'Date obtained');
        await certificateValidator.certificateIssuedBy(data.issuedBy);
        await certificateValidator.certificateId(data.certificateId);
        data.dateObtained = Utils.getDateFromDDMMYYY(data.dateObtained);
        await certificateValidator.checkId(data._id);
        return {
            $set: {
                'certificateDetails.$.name': data.name,
                'certificateDetails.$.dateObtained': data.dateObtained,
                'certificateDetails.$.issuedBy': data.issuedBy,
                'certificateDetails.$.certificateId': data.certificateId
            }
        };
    }

    /**
     * @desc This function is being used to prepare talent billing details to update data
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareBillingEdit(files, data, user, local) {
        const billingValidator = new TalentPayDetailsValidator(data, local);
        const documentValidator = new UserDocumentValidator(data, local);
        const updateData = {};
        const path = `${process.env.NODE_ENV}-documents/${user._id}`;
        const s3Link = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}`;
        billingValidator.billingType(data.billingType);

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

        if (data.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            await billingValidator.validateBillingType(data.billingType, local);
            _.merge(updateData, TalentPayDetailsService.prepareCompanyData(data));
            _.merge(updateData, await UserDocumentsService.uploadCompanyDocuments(files, user, local));
        } else {
            updateData.billing = {
                type: data.billingType
            };
        }

        return {
            $set: updateData
        };
    }


    /**
     * @desc This function is being used to prepare talent payment details to update data
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePaymentEdit(data, local) {
        const paymentValidator = new TalentPayDetailsValidator(data, local);
        const updateData = {};
        paymentValidator.payType(data.payType);
        await paymentValidator.validatePayType();
        if (data.payType !== CONSTANTS.PAYOUT_TYPES_PAYPAL) {
            paymentValidator.bankDetails();
            updateData.pay = {
                type: data.payType,
                bankDetails: {
                    name: data.bankName,
                    accNumber: data.bankAccountNumber,
                    bankCode: data.bankCode
                }
            };
        } else {
            updateData.pay = {
                type: data.payType,
                payPalEmail: data.payPalEmail
            };
        }

        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to prepare talent languages to update data
     * @author Innovify
     * @since 20/07/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareTalentLanguages(data, local) {
        const Validator = new TalentBasicProfileValidator(data, local);
        const updateData = {};
        await Validator.language(data.languages);
        updateData.language = data.languages;
        return {
            $set: updateData
        };
    }

    /**
     * @desc This function is being used to validate talent id for agency edit their details
     * @author Innovify
     * @since 24/11/2020
     * @param {Object} talentId talentId of that user that agency want to update them
     */
    static async checkTalentId(talentId, local) {
        const Validator = new TalentBasicProfileValidator(null, local);
        await Validator.checkId(talentId);
    }
}

module.exports = TalentPrepareEditData;
