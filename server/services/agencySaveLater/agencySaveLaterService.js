const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Agency = require('../../models/agency.model');
const AgencySaveLaterValidator = require('./agencySaveLaterValidator');
const AgencyProfileValidator = require('../agencyProfile/agencyProfileValidator');
const AgencyCertificateValidation = require('../agencyCertificateDetails/agencyCertificateDetailsValidator');
const AgencyPayDetailsValidator = require('../agencyPayDetails/agencyPayDetailsValidator');
const AgencyDirectorsDetailsValidator = require('../agencyAddDirectors/agencyAddDirectorsValidator');
const UploadService = require('../../util/uploadService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency onboarding save-later
 */
class AgencySaveLaterService {
    /**
     * @desc This function is being used to agency onboarding save-later
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveLater (req, user, local) {

        const Validator = new AgencySaveLaterValidator(req.body, local);
        await Validator.validateStep(req.body.step);

        const updateData = await AgencySaveLaterService.getUpdateStepData(req.body, user._id, req.files, local);
        const isUpdateDataEmpty = _.isEmpty(updateData);
        if (!isUpdateDataEmpty) {
            await Agency.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: updateData
            });
        }
    }

    /**
     * @desc This function is being used to prepare agency profile object based on input to update data
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} data data
     * @param {String} id Object id of user
     * @param {file} uploaded file
     * @return {Object} updateData updateData
     */
    static async getUpdateStepData (data, id, file, local) {
        let updateData = {};
        let personalData = {};
        switch (parseInt(data.step)) {
            case 1:
                personalData = await AgencySaveLaterService.prepareProfileUpdateData(data, id, file, local);
                if (!_.isEmpty(personalData.userUpdate)) {
                    await User.updateOne({
                        _id: mongoose.Types.ObjectId(id)
                    }, {
                        $set: personalData.userUpdate
                    });
                }
                updateData = personalData.profileUpdate;
                break;
            case 3:
                updateData = await AgencySaveLaterService.prepareCertificateData(data, local);
                break;
            case 4:
                updateData = await AgencySaveLaterService.preparePayData(data, local);
                break;
            case 5:
                updateData = await AgencySaveLaterService.prepareDirectorsData(data, local);
                break;
        }
        return updateData;

    }

    /**
     * @desc This function is being used to prepare agency profile step 1 profile  to update data
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} data data
     * @param {String} id Object id of user
     * @param {file} uploaded file
     * @return {Object} updateData updateData
     */
    static async prepareProfileUpdateData (data, id, file, local) {

        const ProfileValidator = new AgencyProfileValidator(data, local);
        const profileUpdate = {};
        const userUpdate = {};
        if (_.has(file, 'tradingLogo')) {
            const fileName = `${process.env.NODE_ENV}-trading-logo/${id}`;
            await ProfileValidator.validateTradingLogo(file.tradingLogo[0]);
            await UploadService.uploadFile(file.tradingLogo[0], fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            profileUpdate['trading.logo'] = filePath;
        }

        await AgencySaveLaterService.userDetails(data, userUpdate, local);
        await AgencySaveLaterService.agencyDetails(data, ProfileValidator, profileUpdate);
        await AgencySaveLaterService.tradingDetails(data, ProfileValidator, profileUpdate);

        return { userUpdate, profileUpdate };
    }

    /**
     * Trading Details validate and update object to save
     * @param {Object} data Data Object
     * @param {AgencyProfileValidator} ProfileValidator Profile validator object
     * @param {Object} profileUpdate Updated ref object to save
     */
    static async tradingDetails (data, ProfileValidator, profileUpdate) {
        if (data.tradingName) {
            ProfileValidator.tradingName(data.tradingName);
            profileUpdate['trading.name'] = data.tradingName;
        }
        if (data.tradingWebsite) {
            ProfileValidator.tradingWebsite(data.tradingWebsite);
            profileUpdate['trading.website'] = data.tradingWebsite;
        }
        if (data.tradingSummary) {
            ProfileValidator.tradingSummary(data.tradingSummary);
            profileUpdate['trading.summary'] = data.tradingSummary;
        }
        if (data.tradingAddressLineOne) {
            await ProfileValidator.addressLineOne(data.tradingAddressLineOne);
            profileUpdate['trading.addressLineOne'] = data.tradingAddressLineOne;
        }
        if (data.tradingAddressLineTwo) {
            profileUpdate['trading.addressLineTwo'] = data.tradingAddressLineTwo;
        }
        if (data.tradingCity) {
            await ProfileValidator.city(data.tradingCity);
            profileUpdate['trading.city'] = data.tradingCity;
        }
        if (data.tradingCountry) {
            await ProfileValidator.country(data.tradingCountry);
            profileUpdate['trading.country'] = data.tradingCountry;
        }
        if (data.tradingPostCode) {
            await ProfileValidator.postcode(data.tradingPostCode);
            profileUpdate['trading.postcode'] = data.tradingPostCode;
        }
    }

    /**
     *
     * @param {Object} data Input data
     * @param {AgencyProfileValidator} ProfileValidator Agency validator object
     * @param {Object} profileUpdate Ref Profile object to update
     */
    static async agencyDetails (data, ProfileValidator, profileUpdate) {
        if (data.designation) {
            ProfileValidator.designation(data.designation);
            profileUpdate.designation = data.designation;
        }

        if (data.agencyName) {
            ProfileValidator.agencyName(data.agencyName);
            profileUpdate['agency.name'] = data.agencyName;
        }
        if (data.registeredNumber) {
            ProfileValidator.registeredNumber(data.registeredNumber);
            profileUpdate['agency.registeredNumber'] = data.registeredNumber;
        }
        if (data.agencyAddressLineOne) {
            await ProfileValidator.addressLineOne(data.agencyAddressLineOne);
            profileUpdate['agency.addressLineOne'] = data.agencyAddressLineOne;
        }
        if (data.agencyAddressLineTwo) {
            profileUpdate['agency.addressLineTwo'] = data.agencyAddressLineTwo;
        }
        if (data.agencyCity) {
            await ProfileValidator.city(data.agencyCity);
            profileUpdate['agency.city'] = data.agencyCity;
        }
        if (data.agencyCountry) {
            await ProfileValidator.country(data.agencyCountry);
            profileUpdate['agency.country'] = data.agencyCountry;
        }
        if (data.agencyPostCode) {
            await ProfileValidator.postcode(data.agencyPostCode);
            profileUpdate['agency.postcode'] = data.agencyPostCode;
        }
        if (data.duns) {
            profileUpdate['agency.duns'] = data.duns;
        }
        if (data.agencyVatNumber) {
            profileUpdate['agency.vatNumber'] = data.agencyVatNumber;
        }
    }

    /**
     * User Details validate and update object
     * @param {Object} data
     * @param {Object} userUpdate
     * @param {AgencyProfileValidator} ProfileValidator
     * @param {*} profileUpdate
     */
    static async userDetails (data, userUpdate, local) {
        const Validator = new AgencySaveLaterValidator(data, local);
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
        if (data.phoneNumber) {
            await Validator.phoneNumber(data.phoneNumber);
            userUpdate.phoneNumber = data.phoneNumber;
        }
    }

    /**
     * @desc This function is being used to prepare agency certificate and credetial to update data
     * @author Innovify
     * @since 01/09/2020
     * @param {Object} data data
     * @param {String} id Object id of user
     * @return {Object} updateData updateData
     */
    static async prepareCertificateData (data, local) {
        const Validator = new AgencyCertificateValidation(data, local);
        const updateData = {};

        if (data.certificateDetails
            && data.certificateDetails.length
            && Array.isArray(data.certificateDetails)) {
            await Validator.certificateDetails(data.certificateDetails, true);
            data.certificateDetails.map((d) => {
                d.dateObtained = Utils.getDateFromDDMMYYY(d.dateObtained);
            });

            updateData.certificateDetails = data.certificateDetails;
        }

        if (data.linkedInUrl) {
            Validator.linkedInUrl(data.linkedInUrl);
            updateData['socialProfile.linkedInUrl'] = data.linkedInUrl;
        }

        if (data.gitHubUrl) {
            Validator.gitHubUrl(data.gitHubUrl);
            updateData['socialProfile.gitHubUrl'] = data.gitHubUrl;
        }

        if (data.dribbbleUrl) {
            Validator.dribbbleUrl(data.dribbbleUrl);
            updateData['socialProfile.dribbbleUrl'] = data.dribbbleUrl;
        }

        if (data.clutchUrl) {
            Validator.clutchUrl(data.clutchUrl);
            updateData['socialProfile.clutchUrl'] = data.clutchUrl;
        }

        if (data.goodfirmsUrl) {
            Validator.goodfirmsUrl(data.goodfirmsUrl);
            updateData['socialProfile.goodfirmsUrl'] = data.goodfirmsUrl;
        }

        if (data.otherWebsiteUrl) {
            Validator.otherWebsiteUrl(data.otherWebsiteUrl);
            updateData['socialProfile.otherWebsiteUrl'] = data.otherWebsiteUrl;
        }

        return updateData;
    }

    /**
     * @desc This function is being used to prepare agency pay details to update data
     * @author Innovify
     * @since 31/08/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async preparePayData (data, local) {
        const Validator = new AgencyPayDetailsValidator(data, local);
        const updateData = {};
        if (data.bankName) {
            Validator.bankName(data.bankName);
            updateData['payDetails.bankName'] = data.bankName;
        }

        if (data.bankAccountNumber) {
            Validator.accountNumber(data.bankAccountNumber);
            updateData['payDetails.accNumber'] = data.bankAccountNumber;
        }

        if (data.bankCode) {
            Validator.bankCode(data.bankCode);
            updateData['payDetails.bankCode'] = data.bankCode;
        }

        return updateData;
    }

    /**
     * @desc This function is being used to prepare agency director/shareholders details to update data
     * @author Innovify
     * @since 03/09/2020
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async prepareDirectorsData (data, local) {
        const Validator = new AgencyDirectorsDetailsValidator(data, local);
        const updateData = {};
        if (data.directors && data.directors.length && Array.isArray(data.directors)) {
            await Validator.directorDetails(data.directors);
            updateData.directors = Utils.prepareDirectorsDataDOB(data.directors);
        }

        return updateData;
    }
}

module.exports = AgencySaveLaterService;
