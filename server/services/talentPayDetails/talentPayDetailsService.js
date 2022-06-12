const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const TalentPayDetailsValidator = require('./talentPayDetailsValidator');
const EngageBay = require('../engageBay/engageBay');
const utils = require('../../util/utilFunctions');

/**
 * Class represents services for Talent Pay Details.
 */
class TalentPayDetailsService {
    /**
     * @desc This function is being used to store pay details of talent user
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async savePayDetailsService(req, user, local) {
        const Validator = new TalentPayDetailsValidator(req.body, local);
        await Validator.validationPayDetails();
        await Validator.validatePayType();
        await Validator.validateBillingType();

        const updateData = TalentPayDetailsService.preparePayData(req.body);


        return await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });
    }

    /**
     * @desc This function is used to prepare a payment details from user input
     * @since 12/06/2020
     * @param {Object} data data
     * @author Innovify
     */
    static preparePayData(data) {
        let updateData = {
            currency: data.currency,
            ratePerHour: data.ratePerHour
        };

        if (data.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            updateData = _.merge(updateData, TalentPayDetailsService.prepareCompanyData(data));
        } else {
            updateData.billing = {
                type: data.billingType
            };
        }

        if (data.payType !== CONSTANTS.PAYOUT_TYPES_PAYPAL) {
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

        updateData.signupStep = CONSTANTS.TALENT.REGITRATION_STATUS.PAY_DETAIL;

        return updateData;
    }

    static prepareCompanyData(data) {
        return {
            ['billing.type']: data.billingType,
            ['billing.companyDetails.name']: data.companyName,
            ['billing.companyDetails.registeredNumber']: data.companyregisteredNumber,
            ['billing.companyDetails.postcode']: data.companyPincode,
            ['billing.companyDetails.city']: data.companyCity,
            ['billing.companyDetails.country']: data.companyCountry,
            ['billing.companyDetails.addressLineOne']: data.companyAddressLineOne,
            ['billing.companyDetails.addressLineTwo']: data.companyAddressLineTwo,
            ['billing.companyDetails.website']: data.website,
            ['billing.companyDetails.vatNumber']: data.vatNumber,
            ['billing.companyInsurance.professionInsuranceValue']:
                data.companyProfessionInsuranceValue ? data.companyProfessionInsuranceValue : 0,
            ['billing.companyInsurance.publicInsurancesValue']:
                data.companyPublicInsurancesValue ? data.companyPublicInsurancesValue : 0,
            ['billing.companyInsurance.employerInsuranceValue']:
                data.companyEmployerInsuranceValue ? data.companyEmployerInsuranceValue : 0
        };
    }

}

module.exports = TalentPayDetailsService;
