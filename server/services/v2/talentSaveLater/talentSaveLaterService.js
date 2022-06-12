const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const User = require('../../../models/user.model');
const TalentSaveLaterValidator = require('./talentSaveLaterValidator');
const TalentBasicProfileValidator = require('../../talentBasicProfile/talentBasicProfileValidator');
const TalentProfessinalDetailsValidator = require('../../talentProfessionalDetails/talentProfessionalProfileValidator');
const TalentPreferenceDetailsValidator = require('../../talentPreferenceDetails/talentPreferenceDetailsValidator');
const TalentPayDetailsValidator = require('../talentPayDetails/talentPayDetailsValidator');
const TalentPayDetailsService = require('../talentPayDetails/talentPayDetailsService');
const utils = require('../../../util/utilFunctions');

/**
 * Class represents services for Talent Save Later.
 */
class TalentSaveLaterService {
    /**
     * @desc This function is being used to save user details that supplied in input
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.user User Login details
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveLaterUserDetails(req, user, local) {
        const Validator = new TalentSaveLaterValidator(req.body, local);
        await Validator.validationSaveLater();
        const updateData = await TalentSaveLaterService.getUpdateStepData(req.body, user._id, local);
        const isUpdateDataEmpty = _.isEmpty(updateData);
        if (!isUpdateDataEmpty) {
            await Talent.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: updateData
            });
        }
    }


    /**
     * @desc This function is being used to prepare talent object based on input to update data
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async getUpdateStepData(data, id, local) {
        let updateData = {};
        let personalData = {};
        let isUpdateUser = true;
        switch (data.step) {
            case 1:
                personalData = await TalentSaveLaterService.preparePersonalUpdateData(data, local);
                isUpdateUser = _.isEmpty(personalData.userUpdate);
                if (!isUpdateUser) {
                    await User.updateOne({
                        _id: mongoose.Types.ObjectId(id)
                    }, {
                        $set: personalData.userUpdate
                    });
                }
                updateData = personalData.talentUpdate;
                break;
            case 5:
                updateData = await TalentSaveLaterService.preparePreferenceUpdateData(data, local);
                break;
            case 6:
                updateData = await TalentSaveLaterService.preparePayUpdateData(data, local);
                break;
        }

        return updateData;

    }

    /**
     * @desc This function is being used to prepare talent personal details to update data
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePersonalUpdateData(data, local) {
        const Validator = new TalentBasicProfileValidator(data, local);
        const talentUpdate = {};
        const userUpdate = {};
        if (data.firstName) {
            await Validator.firstName(data.firstName);
            userUpdate.firstName = data.firstName;
        }
        if (data.lastName) {
            await Validator.lastName(data.lastName);
            userUpdate.lastName = data.lastName;
        }
        if (data.countryCode) {
            await Validator.countryCode(data.countryCode);
            userUpdate.countryCode = data.countryCode;
        }
        if (data.country) {
            await Validator.country(data.country);
            talentUpdate.country = data.country;
        }
        if (data.state) {

            talentUpdate.state = data.state;
        }
        if (data.phoneNumber) {
            await Validator.phoneNumber(data.phoneNumber);
            userUpdate.phoneNumber = data.phoneNumber;
        }
        if (data.gender) {
            await Validator.gender(data.gender);
            talentUpdate.gender = data.gender;
        }
        if (data.postcode) {
            await Validator.postcode(data.postcode);
            talentUpdate.postcode = data.postcode;
        }
        if (data.addressLineOne) {
            await Validator.addressLineOne(data.addressLineOne);
            talentUpdate.addressLineOne = data.addressLineOne;
        }
        if (data.addressLineTwo) {
            talentUpdate.addressLineTwo = data.addressLineTwo;
        }
        if (data.city) {
            await Validator.city(data.city);
            talentUpdate.city = data.city;
        }
        if (data.language && data.language.length) {
            await Validator.language(data.language);
            talentUpdate.language = data.language;
        }
        if (data.timeZone) {
            await Validator.timeZone(data.timeZone);
            talentUpdate.timeZone = data.timeZone;
        }
        if (data.dob) {
            var dob = data.dob;
            var dobArray = dob.split('/');
            const dobDate = Date.parse(dobArray[2] + '-' + dobArray[1] + '-' + dobArray[0]);
            if (!isNaN(dobDate)) {
                talentUpdate.dob = MOMENT(dobDate).utc();
            }
        }
        const updateData = await TalentSaveLaterService.prepareProfessionUpdateData(data, local);
        const newTalentUpdate = { ...talentUpdate, ...updateData }
        return { userUpdate, talentUpdate: newTalentUpdate };
    }

    /**
     * @desc This function is being used to prepare talent professional details to update data
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareProfessionUpdateData(data, local) {
        const Validator = new TalentProfessinalDetailsValidator(data, local);
        const updateData = {};

        if (data.linkedInUrl) {
            Validator.linkedInUrl(data.linkedInUrl);
            updateData.linkedInUrl = data.linkedInUrl;
        }
        if (data.gitHubUrl) {
            Validator.gitHubUrl(data.gitHubUrl);
            updateData.gitHubUrl = data.gitHubUrl;
        }
        if (data.stackOverFlowUrl) {
            Validator.stackOverFlowUrl(data.stackOverFlowUrl);
            updateData.stackOverFlowUrl = data.stackOverFlowUrl;
        }

        if (data.primaryRole) {
            await Validator.primaryRole(data.primaryRole);
            updateData.primaryRole = data.primaryRole;
        }
        if (data.yearsOfExperience) {
            await Validator.yearsOfExperience(data.yearsOfExperience);
            updateData.yearsOfExperience = data.yearsOfExperience;
            updateData.experienceOrder = CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.yearsOfExperience);
        }

        if (data.dribbbleUrl) {
            Validator.dribbbleUrl(data.dribbbleUrl);
            updateData.dribbbleUrl = data.dribbbleUrl;
        }
        if (data.behanceUrl) {
            Validator.behanceUrl(data.behanceUrl);
            updateData.behanceUrl = data.behanceUrl;
        }
        if (data.portfolioUrl) {
            Validator.otherWebsiteUrl(data.portfolioUrl);
            updateData.portfolioUrl = data.portfolioUrl;
        }
        return updateData;
    }

    /**
     * @desc This function is being used to prepare talent preference details to update data
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePreferenceUpdateData(data, local) {
        const Validator = new TalentPreferenceDetailsValidator(data, local);
        const updateData = {};
        if (data.teamPreference) {
            await Validator.teamPreference(data.teamPreference);
            updateData.teamPreference = data.teamPreference;
        }
        if (data.assignments) {
            await Validator.assignments(data.assignments);
            updateData.assignments = data.assignments;
        }
        if (data.workPreference) {
            await Validator.workPreference(data.workPreference, false);
            updateData.workPreference = data.workPreference;
        }
        if (data.availability) {
            await Validator.availability(data.availability);
            updateData.availability = data.availability;
        }
        if (data.unavailability) {
            await Validator.unavailability(data.unavailability);
            updateData.unavailability = data.unavailability;
        }
        if (data.industries && Array.isArray(data.industries) && data.industries.length > 0) {
            await Validator.industries(data.industries);
            updateData.industries = data.industries;
        }

        if (data.companyCultures && Array.isArray(data.companyCultures) && data.companyCultures.length > 0) {
            await Validator.companyCultures(data.companyCultures);
            updateData.companyCultures = data.companyCultures;
        }

        if (data.companyType && Array.isArray(data.companyType) && data.companyType.length > 0) {
            Validator.companyType(data.companyType);
            updateData.companyType = data.companyType;
        }

        if (data.preferredProjectDuration && Array.isArray(data.preferredProjectDuration) && data.preferredProjectDuration.length > 0) {
            Validator.preferredProjectDuration(data.preferredProjectDuration);
            updateData.preferredProjectDuration = data.preferredProjectDuration;
        }
        return updateData;
    }

    /**
     * @desc This function is being used to prepare talent pay and billing
     *  details to update data
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePayUpdateData(data, local) {
        const Validator = new TalentPayDetailsValidator(data, local);
        let updateData = {
            isPaymentSkipped: true
        };

        if (data.employmentType) {
            let employmentType = data.employmentType;
            if (data.employmentType && typeof data.employmentType === 'string') {
                employmentType = data.employmentType.split(',');
            }
            if (Array.isArray(employmentType) && employmentType.length > 0) {
                await Validator.employmentType(employmentType);
                updateData.employmentType = employmentType;
            }
        }

        if (data.currencyAnnualRate) {
            Validator.annualRateCurrency(data.currencyAnnualRate);
            updateData.currencyAnnualRate = data.currencyAnnualRate;
        }

        if (data.annualRate) {
            Validator.annualRate(data.annualRate);
            updateData.annualRate = data.annualRate;
        }

        if (data.currency) {
            Validator.currency(data.currency);
            updateData.currency = data.currency;
        }

        if (data.ratePerHour) {
            Validator.ratePerHour(data.ratePerHour);
            updateData.ratePerHour = utils.round(data.ratePerHour, 2);
            updateData.ratePerDay = utils.round(data.ratePerHour * 7.5, 2);
            updateData.ratePerMonth = utils.round(data.ratePerHour * 157.5, 2);
        }

        if (data.billingType) {
            Validator.billingType(data.billingType);

            if (data.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
                await Validator.validateBillingTypeSaveLater(data.billingType);
                updateData = _.merge(updateData, TalentPayDetailsService.prepareCompanyData(data));
            } else {
                updateData.billing = {
                    type: data.billingType
                };
            }
        }

        if (data.payType) {
            await Validator.validatePayType();
            if (data.payType !== CONSTANTS.PAYOUT_TYPES_PAYPAL) {
                Validator.bankDetails();
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
        }
        return updateData;
    }
}

module.exports = TalentSaveLaterService;
