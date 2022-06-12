const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Agency = require('../../models/agency.model');
const AgencyProfileValidator = require('./agencyProfileValidator');
const UploadService = require('../../util/uploadService');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services for agency profile save
 */
class AgencyProfileService {
    /**
     * @desc This function is being used to agency profile save step 1
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateProfile (req, user, local) {
        const fileName = `${process.env.NODE_ENV}-trading-logo/${user._id}`;
        const Validator = new AgencyProfileValidator(req.body, local);
        await Validator.validateProfile(user);
        let filePath = '';

        if (_.has(req.files, 'tradingLogo')) {
            await Validator.validateTradingLogo(req.files.tradingLogo[0], local);
            await UploadService.uploadFile(req.files.tradingLogo[0], fileName);
            filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
        } else if (user.trading && user.trading.logo) {
            filePath = user.trading.logo;
        } else {
            throw new CodeMonkError(local('INVALID_TRADING_LOGO'), 400);
        }

        await AgencyProfileService.isAgencyExists(user._id, req.body.agencyName, req.body.registeredNumber, local);

        const userObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const agencyObject = {
            designation: req.body.designation,
            agency: {
                name: req.body.agencyName,
                registeredNumber: req.body.registeredNumber,
                addressLineOne: req.body.agencyAddressLineOne,
                addressLineTwo: (req.body.agencyAddressLineTwo) ? req.body.agencyAddressLineTwo : '',
                city: req.body.agencyCity,
                country: req.body.agencyCountry,
                postcode: req.body.agencyPostCode,
                duns: req.body.duns,
                vatNumber: req.body.agencyVatNumber
            },
            trading: {
                name: req.body.tradingName,
                website: req.body.tradingWebsite,
                summary: req.body.tradingSummary,
                logo: filePath,
                postcode: req.body.tradingPostCode,
                addressLineOne: req.body.tradingAddressLineOne,
                addressLineTwo: (req.body.tradingAddressLineTwo) ? req.body.tradingAddressLineTwo : '',
                city: req.body.tradingCity,
                country: req.body.tradingCountry
            }
        };

        if (user.signupStep === undefined || user.signupStep < CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
            userObject.countryCode = req.body.countryCode;
            userObject.phoneNumber = req.body.phoneNumber;
            agencyObject.signupStep = CONSTANTS.AGENCY.REGITRATION_STATUS.BASIC_PROFILE;
        }

        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: userObject
        });

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: agencyObject
        });

        return `${filePath}?v=${MOMENT().unix()}`;
    }

    static async isAgencyExists (id, companyName, companyregisteredNumber, local) {
        const companyNameSearch = new RegExp(['^', companyName, '$'].join(''), 'i');
        const companyregisteredNumberSearch = new RegExp(['^', companyregisteredNumber, '$'].join(''), 'i');
        const company = await Agency.findOne({
            userId: { $ne: id },
            $or: [{
                'agency.name': companyNameSearch
            },
            {
                'agency.registeredNumber': companyregisteredNumberSearch
            }]
        });

        if (company) {
            throw new CodeMonkError(local('AGENCY_ALREADY_EXISTS'), 400);
        }
    }
}

module.exports = AgencyProfileService;
