const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Client = require('../../models/client.model');
const ClientProfileValidator = require('./clientProfileValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Sms = require('../../util/sendSMS');
const HubSpot = require('../hubSpot/hubSpot');
const EngageBay = require('../engageBay/engageBay');
const utils = require('../../util/utilFunctions');
const UploadService = require('../../util/uploadService');
const AddCompanyValidator = require('../v2/addCompany/addCompanyValidator');
const TalentReferralLogService = require('../v2/talentReferralLog/talentReferralLogService');

/**
 * Class represents services for client profile Details.
 */
class ClientProfileService {
    /**
     * @desc This function is being used to save client phone number and send OTP SMS
     * @author Innovify
     * @since 06/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.countrycode county code
     * @param {String} req.body.phone phone number
     * @param {object} user Logged in client user data
     */
    static async saveClientPhoneNumber (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.countryCode(req.body.countryCode);
        await Validator.phoneNumber(req.body.phoneNumber);
        const otp = await UtilFunctions.generateOtp();
        const message = `Welcome to Codemonk. Please activate your mobile number by entering ${otp}.`;
        const to = `${req.body.countryCode}${req.body.phoneNumber}`;
        await Sms.sendSMS(to, message);
        if (!user.signupStep || user.signupStep < CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING) {
            return await User.updateOne({
                _id: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    countryCode: req.body.countryCode,
                    phoneNumber: req.body.phoneNumber,
                    phoneOtp: otp
                }
            });
        } else {
            return await User.updateOne({
                _id: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    requestedCountryCode: req.body.countryCode,
                    requestedPhoneNumber: req.body.phoneNumber,
                    phoneOtp: otp
                }
            });
        }
    }

    /**
     * @desc This function is being used to verify client phone number using otp
     * @author Innovify
     * @since 07/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp code
     * @param {object} user Logged in client user data
     */
    static async verifyClientPhoneNumber (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.otp(req.body.otp);

        const userDetails = await User.findOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            phoneOtp: 1
        });

        if (userDetails.phoneOtp !== req.body.otp) {
            throw new CodeMonkError(local('INVALID_OTP'), 400);
        }
        if (user.signupStep === undefined || user.signupStep < CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING) {
            return await Client.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    signupStep: CONSTANTS.CLIENT.REGITRATION_STATUS.BASIC_PROFILE
                }
            });
        } else {
            const u = await User.findOne({ _id: mongoose.Types.ObjectId(user._id) }, {
                requestedCountryCode: 1,
                requestedPhoneNumber: 1
            });
            return await User.updateOne({
                _id: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    countryCode: u.requestedCountryCode,
                    phoneNumber: u.requestedPhoneNumber
                }
            });
        }
    }

    /**
     * @desc This function is being used to update client profile
     * @author Innovify
     * @since 08/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async updateClientProfile (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.profile();
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        const updateData = ClientProfileService.prepareCompanyProfileUpdateData(req.body, user);

        if (user.signupStep < CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING) {

            // Update hubspot contact, don't wait.
            HubSpot.updateContact(user, { 'platform_status': CONSTANTS.HUBSPOT.PLATFORM_STATUSES.ACTIVE });

            EngageBay.updateEngageBayContactTags(user.email, ['client', 'active'], utils.getEngageBayContactProproperties(user));
        }

        return await Client.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });
    }

    /**
     * @desc This function is being used to prepare client profile update data
     * @author Innovify
     * @since 08/07/2020
     * @param {Object} data Request object inputs
     * @param {object} user Logged in client user data
     */
    static prepareCompanyProfileUpdateData (data, user) {
        const updateData = {
            jobTitle: data.jobTitle,
            registerType: CONSTANTS.CLIENT_TYPES[1]
        };

        [
            'postcode', 'timeZone', 'addressLineOne',
            'addressLineTwo', 'city', 'country'
        ].forEach((key) => {
            if (data[key]) {
                updateData[key] = data[key];
            }
        });

        // This means user updating data from profile page
        if (user.signupStep >= CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING && user.billing.type === CONSTANTS.CLIENT_TYPES[1]) {
            _.merge(updateData, ClientProfileService.getCompanyDataAtProfile(data));
        } else if (user.signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.BASIC_PROFILE && data.type === CONSTANTS.CLIENT_TYPES[1]) {
            _.merge(updateData, ClientProfileService.getCompanyDataAtOnBoarding(data));
        } else if (user.signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.BASIC_PROFILE && data.type === CONSTANTS.CLIENT_TYPES[0]) {
            _.merge(updateData, ClientProfileService.getIndividualDataAtOnBoarding(data));
        }

        return updateData;
    }

    /**
     * @desc This function is being used to update client profile
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async updateClientAboutYou (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.aboutYou();
        await Validator.countryCode(req.body.countryCode);
        await Validator.phoneNumber(req.body.phoneNumber);
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                countryCode: req.body.countryCode,
                phoneNumber: req.body.phoneNumber
            }
        });

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.countryCode = req.body.countryCode;
        user.phoneNumber = req.body.phoneNumber;

        const updateData = {
            jobTitle: req.body.jobTitle,
            registerType: CONSTANTS.CLIENT_TYPES[1],
            jobRole: req.body.jobRole,
            version: 'v2'
        };

        const signupStep = utils.getSignupStepForClient(user, CONSTANTS.CLIENT.REGITRATION_STATUS.BASIC_PROFILE);
        if (signupStep) {
            updateData.signupStep = signupStep;
            if(signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMPANY_LOCATION){
                EngageBay.updateEngageBayContactTags(user.email, ['client', 'active'], utils.getEngageBayContactProproperties(user));
            }
        }
        const client = await Client.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        }, { new: true });
        return _.merge(user, client);

    }

    /**
     *
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} data
     * @returns
     */
    static async updateClientAboutCompany (req, user, local) {
        if (req.body.cultures) {
            req.body.cultures = req.body.cultures.split(',');
        }
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.companyDetails();
        const updateData = {
            ['billing.companyDetails.name']: req.body.name,
            ['billing.companyDetails.brand']: req.body.brand,
            ['billing.companyDetails.registeredNumber']: req.body.registeredNumber,
            ['billing.companyDetails.vatNumber']: req.body.vatNumber,
            ['billing.companyDetails.industry']: req.body.industry,
            ['billing.companyDetails.companyType']: req.body.companyType,
            ['billing.companyDetails.cultures']: (req.body.cultures && req.body.cultures.length) ? req.body.cultures : [],
            ['billing.companyDetails.portfolioUrl']: _.get(req.body, 'portfolioUrl', ''),
            ['billing.companyDetails.linkedInUrl']: _.get(req.body, 'linkedInUrl', ''),
            ['billing.companyDetails.gitHubUrl']: _.get(req.body, 'gitHubUrl', ''),
            ['billing.companyDetails.stackOverFlowUrl']: _.get(req.body, 'stackOverFlowUrl', ''),
            ['billing.companyDetails.behanceUrl']: _.get(req.body, 'behanceUrl', ''),
            ['billing.companyDetails.dribbbleUrl']: _.get(req.body, 'dribbbleUrl', ''),
            ['billing.type']: CONSTANTS.CLIENT_TYPES[1]
        };

        if (req.file) {
            const LogoValidator = new AddCompanyValidator(req.file, local);
            const fileName = `${process.env.NODE_ENV}/companies/${user._id}`;
            await LogoValidator.validateLogo();
            await UploadService.uploadFile(req.file, fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            updateData[['billing.companyDetails.logo']] = filePath;
        }

        const signupStep = utils.getSignupStepForClient(user, CONSTANTS.CLIENT.REGITRATION_STATUS.COMAPNY_DETAIL);
        if (signupStep) {
            updateData.signupStep = signupStep;
            if(signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMPANY_LOCATION){
                EngageBay.updateEngageBayContactTags(user.email, ['client', 'active'], utils.getEngageBayContactProproperties(user));
            }
        }

        // DB update - Referral: Update "daysOfRefereeActivated" where "refereeUserId".
        await TalentReferralLogService.updateReferralLog(user._id, 'Active');

        return await Client.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        }, {
            new: true
        });
    }

    /**
     *
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} data
     * @returns
     */
    static async updateClientCompanyLocation (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.companyLocation();

        if (!(user && user.signupStep && !(user.signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMAPNY_DETAIL))) {

        }

        const signupStep = utils.getSignupStepForClient(user, CONSTANTS.CLIENT.REGITRATION_STATUS.COMPANY_LOCATION);
        if (signupStep) {
            await Client.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    signupStep: signupStep
                }
            });
            if(signupStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMPANY_LOCATION) {
                EngageBay.updateEngageBayContactTags(user.email, ['client', 'active'], utils.getEngageBayContactProproperties(user));

                // Update hubspot contact, don't wait.
                HubSpot.updateContact(user, { 'platform_status': CONSTANTS.HUBSPOT.PLATFORM_STATUSES.ACTIVE });
            }
        }

        const companyLocation = {
            locationName: req.body.locationName,
            postcode: req.body.postcode,
            country: req.body.country,
            addressLineOne: req.body.addressLineOne,
            addressLineTwo: _.get(req.body, 'addressLineTwo', ''),
            city: req.body.city,
            state: _.get(req.body, 'state', ''),
            timezone: req.body.timezone
        };

        const clientRes = await Client.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $push: {
                ['billing.companyLocation']: {
                    $each: [companyLocation],
                    $position: 0
                }
            }
        }, {
            new: true
        });

        // DB update - Referral: Update "daysOfRefereeVerified" where "refereeUserId".
        await TalentReferralLogService.updateReferralLog(talent.userId, 'Verified');
        return clientRes;
    }


    static async updateClientCompanyLocationEdit (req, user, local) {
        const Validator = new ClientProfileValidator(req.body, local);
        await Validator.checkId(req.body._id);
        await Validator.companyLocation();

        const companyLocation = {
            'billing.companyLocation.$.locationName': req.body.locationName,
            'billing.companyLocation.$.postcode': req.body.postcode,
            'billing.companyLocation.$.country': req.body.country,
            'billing.companyLocation.$.addressLineOne': req.body.addressLineOne,
            'billing.companyLocation.$.addressLineTwo': _.get(req.body, 'addressLineTwo', ''),
            'billing.companyLocation.$.city': req.body.city,
            'billing.companyLocation.$.state': _.get(req.body, 'state', ''),
            'billing.companyLocation.$.timezone': req.body.timezone
        };

        return await Client.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id),
            'billing.companyLocation._id': mongoose.Types.ObjectId(req.body._id)
        }, {
            $set: companyLocation
        }, {
            new: true
        });
    }

    static async deleteClientCompanyLocation (req, user, local) {
        const Validator = new ClientProfileValidator(null, local);
        await Validator.checkId(req.body._id);

        return await Client.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $pull: {
                'billing.companyLocation': { _id: mongoose.Types.ObjectId(req.body._id) }
            }
        }, {
            new: true
        });
    }

    /**
     * @desc This function is being used to prepare client profile data for individual type at onboarding
     * @author Innovify
     * @since 09/08/2020
     * @param {Object} data Request object inputs
     */
    static getIndividualDataAtOnBoarding (data) {
        return {
            signupStep: CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING,
            registerType: data.type,
            billing: {
                type: data.type
            }
        };
    }

    /**
     * @desc This function is being used to prepare client profile data for company type at onboarding
     * @author Innovify
     * @since 09/08/2020
     * @param {Object} data Request object inputs
     */
    static getCompanyDataAtOnBoarding (data) {
        const updateData = {};
        updateData.signupStep = CONSTANTS.CLIENT.REGITRATION_STATUS.ON_BOARDING;
        updateData.registerType = data.type;
        _.merge(updateData, ClientProfileService.getCompanyDetails(data, true));
        _.merge(updateData, ClientProfileService.getAuthorityDetails(data));
        return updateData;
    }

    static getCompanyDetails (data, isOnBoarding) {
        const updatedDate = {
            ['billing.companyDetails.name']: data.companyName,
            ['billing.companyDetails.registeredNumber']: data.companyregisteredNumber,
            ['billing.companyDetails.postcode']: data.companyPincode,
            ['billing.companyDetails.city']: data.companyCity,
            ['billing.companyDetails.country']: data.companyCountry,
            ['billing.companyDetails.addressLineOne']: data.companyAddressLineOne,
            ['billing.companyDetails.addressLineTwo']: (data.companyAddressLineTwo) ? data.companyAddressLineTwo : '',
            ['billing.companyDetails.website']: (data.website) ? data.website : '',
            ['billing.companyDetails.vatNumber']: data.vatNumber
        };
        if (isOnBoarding) {
            updatedDate['billing.type'] = data.type;
        }
        return updatedDate;
    }

    static getAuthorityDetails (data) {
        const authorityDetails = {
            ['authority.firstName']: data.authorityFirstName,
            ['authority.lastName']: data.authorityLastName,
            ['authority.email']: data.authorityEmail,
            ['authority.countryCode']: data.authorityCountryCode,
            ['authority.phoneNumber']: data.authorityPhoneNumber,
            ['authority.jobTitle']: data.authorityJobTitle
        };

        if (data.authorityPostcode) {
            authorityDetails['authority.postcode'] = data.authorityPostcode;
        }
        if (data.authorityTimeZone) {
            authorityDetails['authority.timeZone'] = data.authorityTimeZone;
        }
        if (data.authorityAddressLineOne) {
            authorityDetails['authority.addressLineOne'] = data.authorityAddressLineOne;
        }
        if (data.authorityAddressLineTwo) {
            authorityDetails['authority.addressLineTwo'] = (data.authorityAddressLineTwo) ? data.authorityAddressLineTwo : '';
        }
        if (data.authorityCity) {
            authorityDetails['authority.city'] = data.authorityCity;
        }
        if (data.authorityCountry) {
            authorityDetails['authority.country'] = data.authorityCountry;
        }
        return authorityDetails;
    }

    /**
     * @desc This function is being used to prepare client profile data for company type at profile
     * @author Innovify
     * @since 09/08/2020
     * @param {Object} data Request object inputs
     */
    static getCompanyDataAtProfile (data) {
        const updateData = {};
        _.merge(updateData, ClientProfileService.getCompanyDetails(data));
        _.merge(updateData, ClientProfileService.getAuthorityDetails(data));
        return updateData;
    }

    /**
     * @desc This function is being used to update client profile partial save later
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async updateClientSaveLater (req, user, local) {
        if (req.body.step === '2' && req.file) {
            const LogoValidator = new AddCompanyValidator(req.file, local);
            const fileName = `${process.env.NODE_ENV}/companies/${user._id}`;
            await LogoValidator.validateLogo();
            await UploadService.uploadFile(req.file, fileName);
            const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
            req.body.logo = filePath;
        }
        const updateData = await ClientProfileService.getUpdateStepData(req.body, user, local);
        const isUpdateDataEmpty = _.isEmpty(updateData);
        if (!isUpdateDataEmpty) {
            await Client.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: updateData
            });
        }
        // DB update - Referral: Update "daysOfRefereeActivated" where "refereeUserId".
        await TalentReferralLogService.updateReferralLog(user._id, 'Active');
    }

    /**
     * @desc This function is being used to prepare talent object based on input to update data
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} data data
     * @return {Object} updateData updateData
     */
    static async getUpdateStepData (data, user, local) {
        const updateData = {};
        const updateUserData = {};
        const Validator = new ClientProfileValidator(data, local);
        switch (data.step) {
            case '1':
                if (data.firstName) {
                    await Validator.firstName(data.firstName);
                    updateUserData.firstName = data.firstName;
                }
                if (data.lastName) {
                    await Validator.lastName(data.lastName);
                    updateUserData.lastName = data.lastName;
                }
                if (data.countryCode) {
                    await Validator.countryCode(data.countryCode);
                    updateUserData.countryCode = data.countryCode;
                }
                if (data.phoneNumber) {
                    await Validator.phoneNumber(data.phoneNumber);
                    updateUserData.phoneNumber = data.phoneNumber;
                }
                if (data.jobTitle) {
                    await Validator.checkJobTitle(data.jobTitle);
                    updateData.jobTitle = data.jobTitle;
                }
                if (data.jobRole) {
                    await Validator.checkJobRole(data.jobRole);
                    updateData.jobRole = data.jobRole;
                }
                await User.updateOne({
                    _id: mongoose.Types.ObjectId(user._id)
                }, {
                    $set: updateUserData
                });
                break;
            case '2':
                if (data.logo) {
                    updateData[['billing.companyDetails.logo']] = data.logo;
                }
                if (data.name) {
                    await Validator.companyLegalName(data.name);
                    updateData[['billing.companyDetails.name']] = data.name;
                }
                if (data.brand) {
                    await Validator.companyBrand(data.brand);
                    updateData[['billing.companyDetails.brand']] = data.brand;
                }
                if (data.registeredNumber) {
                    await Validator.registeredNumber(data.registeredNumber);
                    updateData[['billing.companyDetails.registeredNumber']] = data.registeredNumber;
                }
                if (data.vatNumber) {
                    await Validator.vatNumber(data.vatNumber);
                    updateData[['billing.companyDetails.vatNumber']] = data.vatNumber;
                }
                if (data.industry) {
                    await Validator.industry(data.industry);
                    updateData[['billing.companyDetails.industry']] = data.industry;
                }
                if (data.companyType) {
                    await Validator.checkCompanyType(data.companyType);
                    updateData[['billing.companyDetails.companyType']] = data.companyType;
                }
                if (data.cultures) {
                    data.cultures = data.cultures.split(',');
                    if (data.cultures.length > 0) {
                        await Validator.companyCultures(data.cultures);
                        updateData[['billing.companyDetails.cultures']] = data.cultures;
                    }
                }
                if (data.portfolioUrl) {
                    await Validator.otherWebsiteUrl(data.companyDetails);
                    updateData[['billing.companyDetails.portfolioUrl']] = data.portfolioUrl;
                }
                if (data.linkedInUrl) {
                    await Validator.linkedInUrl(data.linkedInUrl);
                    updateData[['billing.companyDetails.linkedInUrl']] = data.linkedInUrl;
                }

                if (data.gitHubUrl) {
                    await Validator.gitHubUrl(data.gitHubUrl);
                    updateData[['billing.companyDetails.gitHubUrl']] = data.gitHubUrl;
                }

                if (data.stackOverFlowUrl) {
                    await Validator.stackOverFlowUrl(data.stackOverFlowUrl);
                    updateData[['billing.companyDetails.stackOverFlowUrl']] = data.stackOverFlowUrl;
                }
                if (data.behanceUrl) {
                    await Validator.behanceUrl(data.behanceUrl);
                    updateData[['billing.companyDetails.behanceUrl']] = data.behanceUrl;
                }
                if (data.dribbbleUrl) {
                    await Validator.dribbbleUrl(data.dribbbleUrl);
                    updateData[['billing.companyDetails.dribbbleUrl']] = data.dribbbleUrl;
                }
                break;
            case '3':
                break;
        }

        return updateData;
    }

    /**
     * @desc This function is being used to prepare client partial date for save later
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} data data
     * @return {Object} updateData { userUpdate, clientUpdate}
     */
    static async prepareBasicProfileData (data, local) {
        const Validator = new ClientProfileValidator(data, local);
        let clientUpdate = {};
        const userUpdate = {};
        if (data.firstName) {
            await Validator.firstName(data.firstName);
            userUpdate.firstName = data.firstName;
        }
        if (data.lastName) {
            await Validator.lastName(data.lastName);
            userUpdate.lastName = data.lastName;
        }
        if (data.jobTitle) {
            await Validator.checkJobTitle(data.jobTitle);
            clientUpdate.jobTitle = data.jobTitle;
        }
        if (data.postcode) {
            await Validator.postcode(data.postcode);
            clientUpdate.postcode = data.postcode;
        }
        if (data.timeZone) {
            await Validator.timeZone(data.timeZone);
            clientUpdate.timeZone = data.timeZone;
        }
        if (data.addressLineOne) {
            await Validator.addressLineOne(data.addressLineOne);
            clientUpdate.addressLineOne = data.addressLineOne;
        }
        if (data.addressLineTwo) {
            clientUpdate.addressLineTwo = data.addressLineTwo;
        }
        if (data.city) {
            await Validator.city(data.city);
            clientUpdate.city = data.city;
        }
        if (data.country) {
            await Validator.country(data.country);
            clientUpdate.country = data.country;
        }
        const typeDetails = await ClientProfileService.prepareClientProfileTypeData(data, local);
        clientUpdate = _.merge(clientUpdate, typeDetails);
        return { userUpdate, clientUpdate };
    }

    /**
     * @desc This function is being used to prepare client personal details for company type
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} data data
     * @return {Object} clientUpdate clientUpdate
     */
    static async prepareClientProfileTypeData (data, local) {
        const clientUpdate = {};
        if (data.type) {
            const Validator = new ClientProfileValidator(data, local);
            await Validator.companyType(data.type);
            clientUpdate.billing = {
                type: data.type
            };
            if (data.type === CONSTANTS.CLIENT_TYPES[1]) {
                const companyDetails = await ClientProfileService.prepareCompanyData(data, local);
                const isCompanyDetailsEmpty = _.isEmpty(companyDetails);
                if (!isCompanyDetailsEmpty) {
                    clientUpdate.billing.companyDetails = companyDetails;
                }

                const authority = await ClientProfileService.prepareAuthorityData(data, local);
                const isAuthorityEmpty = _.isEmpty(authority);
                if (!isAuthorityEmpty) {
                    clientUpdate.authority = authority;
                }
            }
        }

        return clientUpdate;
    }

    /**
     * @desc This function is being used to prepare client personal details for company only
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} data data
     * @return {Object} companyData companyData
     */
    static async prepareCompanyData (data, local) {
        const Validator = new ClientProfileValidator(data, local);
        const companyData = {};
        if (data.companyName) {
            await Validator.companyName(data.companyName);
            companyData.name = data.companyName;
        }
        if (data.companyregisteredNumber) {
            await Validator.registeredNumber(data.companyregisteredNumber);
            companyData.registeredNumber = data.companyregisteredNumber;
        }
        if (data.companyPincode) {
            await Validator.postcode(data.companyPincode);
            companyData.postcode = data.companyPincode;
        }
        if (data.companyCity) {
            await Validator.city(data.companyCity);
            companyData.city = data.companyCity;
        }
        if (data.companyCountry) {
            await Validator.country(data.companyCountry);
            companyData.country = data.companyCountry;
        }
        if (data.companyAddressLineOne) {
            await Validator.addressLineOne(data.companyAddressLineOne);
            companyData.addressLineOne = data.companyAddressLineOne;
        }
        if (data.companyAddressLineTwo) {
            companyData.addressLineTwo = data.companyAddressLineTwo;
        }
        if (data.website) {
            companyData.website = data.website;
        }
        if (data.vatNumber) {
            await Validator.vatNumber(data.vatNumber);
            companyData.vatNumber = data.vatNumber;
        }

        return companyData;
    }

    /**
     * @desc This function is being used to prepare client personal details for authority only
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} data data
     * @return {Object} authority authority
     */
    static async prepareAuthorityData (data, local) {
        const Validator = new ClientProfileValidator(data, local);
        const authority = {};
        if (data.authorityFirstName) {
            await Validator.firstName(data.authorityFirstName, 'Authority First Name');
            authority.firstName = data.authorityFirstName;
        }
        if (data.authorityLastName) {
            await Validator.lastName(data.authorityLastName, 'Authority Last Name');
            authority.lastName = data.authorityLastName;
        }
        if (data.authorityEmail) {
            await Validator.email(data.authorityEmail, 'Authority Email');
            authority.email = data.authorityEmail;
        }
        if (data.authorityCountryCode) {
            await Validator.countryCode(data.authorityCountryCode, 'Authority Country Code');
            authority.countryCode = data.authorityCountryCode;
        }
        if (data.authorityPhoneNumber) {
            await Validator.phoneNumber(data.authorityPhoneNumber, 'Authority Phone Number');
            authority.phoneNumber = data.authorityPhoneNumber;
        }
        if (data.authorityJobTitle) {
            await Validator.checkJobTitle(data.authorityJobTitle, 'Authority Job Title');
            authority.jobTitle = data.authorityJobTitle;
        }
        if (data.authorityPostcode) {
            await Validator.postcode(data.authorityPostcode, 'Authority Post Code');
            authority.postcode = data.authorityPostcode;
        }
        if (data.authorityTimeZone) {
            await Validator.timeZone(data.authorityTimeZone, 'Authority TimeZone');
            authority.timeZone = data.authorityTimeZone;
        }
        if (data.authorityAddressLineOne) {
            await Validator.addressLineOne(data.authorityAddressLineOne, 'Authority address line one');
            authority.addressLineOne = data.authorityAddressLineOne;
        }
        if (data.authorityAddressLineTwo) {
            authority.addressLineTwo = data.authorityAddressLineTwo;
        }
        if (data.authorityCity) {
            await Validator.city(data.authorityCity, 'Authority City');
            authority.city = data.authorityCity;
        }
        if (data.authorityCountry) {
            await Validator.country(data.authorityCountry, 'Authority Country');
            authority.country = data.authorityCountry;
        }

        return authority;
    }

    /**
     * @desc This function is being used to update client billing partial save later
     * @author Innovify
     * @since 04/08/2020
     * @param {Object} data data
     * @param {object} user Logged in client user data
     */
    static async prepareBillingData (data, user, local) {
        const updateData = {
            signupStep: CONSTANTS.CLIENT.REGITRATION_STATUS.PAY_DETAIL
        };
        const payDetails = await ClientProfileService.prepareClientPayDetails(data);
        const isPayDetailsEmpty = _.isEmpty(payDetails);
        if (!isPayDetailsEmpty) {
            updateData.pay = payDetails;
        }

        // Means user already field those compnay details
        if (user.registerType === CONSTANTS.CLIENT_TYPES[1]) {
            _.merge(updateData, ClientProfileService.getCompanyDetailsInsuranceDetails(data));
            // Means user choose individual field and can fill the individual/compnay details
        } else if (user.registerType === CONSTANTS.CLIENT_TYPES[0]) {
            updateData.type = data.billingType;
            if (data.billingType === CONSTANTS.CLIENT_TYPES[1]) {
                const companyBillingDetails = await ClientProfileService.prepareClientCompanyDetails(data, local);
                const isCompanyBillingDetails = _.isEmpty(companyBillingDetails);
                if (!isCompanyBillingDetails) {
                    _.merge(updateData, companyBillingDetails);
                }

                const companyAuthorityDetails = await ClientProfileService.prepareAuthorityData(data, local);
                const isAuthorityBillingDetails = _.isEmpty(companyAuthorityDetails);
                if (!isAuthorityBillingDetails) {
                    updateData.authority = companyAuthorityDetails;
                }
            }
        }

        return updateData;
    }

    static getCompanyDetailsInsuranceDetails (data) {
        const companyInsurance = {};
        if (data.companyProfessionInsuranceValue && !isNaN(data.companyProfessionInsuranceValue)) {
            companyInsurance['billing.companyInsurance.professionInsuranceValue'] = data.companyProfessionInsuranceValue;
        }
        if (data.companyPublicInsurancesValue && !isNaN(data.companyPublicInsurancesValue)) {
            companyInsurance['billing.companyInsurance.publicInsurancesValue'] = data.companyPublicInsurancesValue;
        }
        if (data.companyEmployerInsuranceValue && !isNaN(data.companyEmployerInsuranceValue)) {
            companyInsurance['billing.companyInsurance.employerInsuranceValue'] = data.companyEmployerInsuranceValue;
        }
        return companyInsurance;
    }

    /**
     * @desc This function is being used to update client billing partial for payment
     * @author Innovify
     * @since 04/08/2020
     * @param {Object} data data
     */
    static async prepareClientPayDetails (data) {
        let payData = {};
        if (data.payType === CONSTANTS.PAYOUT_TYPES_BANK) {
            payData = {
                type: data.payType,
                bankDetails: {}
            };
            if (data.bankName) {
                payData.bankDetails.name = data.bankName;
            }

            if (data.bankAccountNumber) {
                payData.bankDetails.accNumber = data.bankAccountNumber;
            }

            if (data.bankCode) {
                payData.bankDetails.bankCode = data.bankCode;
            }

        } else if (data.payType === CONSTANTS.PAYOUT_TYPES_PAYPAL) {
            payData = {
                type: data.payType
            };
            if (data.payPalEmail) {
                payData.payPalEmail = data.payPalEmail;
            }
        }

        return payData;
    }

    /**
     * @desc This function is being used to update client billing partial for type
     * @author Innovify
     * @since 04/08/2020
     * @param {Object} data data
     */
    static async prepareClientCompanyDetails (data, local) {
        const type = data.billingType;
        let companyData = {
        };

        if (type === CONSTANTS.CLIENT_TYPES[1]) {
            companyData = {
                billing: {
                    type
                }
            };
            const companyDetails = await ClientProfileService.prepareCompanyData(data, local);
            const isCompanyDetails = _.isEmpty(companyDetails);
            if (!isCompanyDetails) {
                companyData.billing.companyDetails = companyDetails;
            }

            const companyAuthorityDetails = await ClientProfileService.prepareAuthorityData(data, local);
            const isAuthorityBillingDetails = _.isEmpty(companyAuthorityDetails);
            if (!isAuthorityBillingDetails) {
                companyData.authority = companyAuthorityDetails;
            }
            companyData.billing.companyInsurance = {};

            if (data.companyProfessionInsuranceValue && !isNaN(data.companyProfessionInsuranceValue)) {
                companyData.billing.companyInsurance.professionInsuranceValue = data.companyProfessionInsuranceValue;
            }

            if (data.companyPublicInsurancesValue && !isNaN(data.companyPublicInsurancesValue)) {
                companyData.billing.companyInsurance.publicInsurancesValue = data.companyPublicInsurancesValue;
            }

            if (data.companyEmployerInsuranceValue && !isNaN(data.companyEmployerInsuranceValue)) {
                companyData.billing.companyInsurance.employerInsuranceValue = data.companyEmployerInsuranceValue;
            }
        }
        return companyData;
    }
}

module.exports = ClientProfileService;
