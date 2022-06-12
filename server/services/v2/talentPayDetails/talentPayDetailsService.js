const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const TalentPayDetailsValidator = require('./talentPayDetailsValidator');
const utils = require('../../../util/utilFunctions');
const AddCompanyService = require('../addCompany/addCompanyService');

/**
 * Class represents services for Talent Pay Details.
 */
class TalentPayDetailsService {
    /**
     * @desc This function is being used to store pay details of talent user
     * @author CodeMonk
     * @since 28/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async savePayDetailsService (req, user, local) {
        const Validator = new TalentPayDetailsValidator(req.body, local);
        await Validator.validationPayDetails();
        await Validator.validateBillingType();
        let company = {};
        if (req.body && req.body.billingType && req.body.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            company = await AddCompanyService.getAddedOrUpdatedCompany(req.body.companyName, req.body.companyCountry, req.file, local);
        }

        const updateData = TalentPayDetailsService.preparePayData(req.body, company);
        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.BILLING_DETAIL);

        if (signupStep) {
            updateData.signupStep = signupStep;
        }

        

        const talent = await Talent.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        }, { new: true });

        const oldUserStep = user.signupStep;
        await utils.profileEditLog(talent, oldUserStep);
        await utils.profileCompleteLog(talent, oldUserStep);

        return talent;
    }



    /**
     * @desc This function is used to prepare a payment details from user input
     * @since 28/10/2021
     * @param {Object} data data
     * @author CodeMonk
     */
    static preparePayData (data, company) {
        const employmentType = data.employmentType.split(',');

        let updateData = {
            employmentType: employmentType
        };

        if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE) === -1)) {
            updateData.currencyAnnualRate = data.currencyAnnualRate;
            updateData.annualRate = data.annualRate;
        }

        if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) === -1)) {
            updateData.currency = data.currency;
            updateData.ratePerHour = utils.round(data.ratePerHour, 2);
            updateData.ratePerDay = utils.round(data.ratePerHour * 7.5, 2);
            updateData.ratePerMonth = utils.round(data.ratePerHour * 157.5, 2);
        }

        if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) === -1)
        && data.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            updateData = _.merge(updateData, TalentPayDetailsService.prepareCompanyData(data, company));
        } else if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) === -1)) {
            updateData.billing = {
                type: data.billingType
            };
        }

        return updateData;
    }

    static prepareCompanyData (data, company) {
        return {
            ['billing.type']: data.billingType,
            ['billing.companyDetails.name']: data.companyName,
            ['billing.companyDetails.registeredNumber']: data.companyregisteredNumber,
            ['billing.companyDetails.postcode']: data.companyPincode,
            ['billing.companyDetails.city']: data.companyCity,
            ['billing.companyDetails.state']: data.companyState,
            ['billing.companyDetails.country']: data.companyCountry,
            ['billing.companyDetails.addressLineOne']: data.companyAddressLineOne,
            ['billing.companyDetails.addressLineTwo']: data.companyAddressLineTwo,
            ['billing.companyDetails.website']: data.website,
            ['billing.companyDetails.vatNumber']: data.vatNumber,
            ['billing.companyDetails.logo']: company && company.logo ? company.logo : '',
            ['billing.companyInsurance.currencyProfessionInsuranceValue']:
                data.currencyCompanyProfessionInsuranceValue ? data.currencyCompanyProfessionInsuranceValue : '',
            ['billing.companyInsurance.professionInsuranceValue']:
                data.companyProfessionInsuranceValue ? data.companyProfessionInsuranceValue : 0,
            ['billing.companyInsurance.currencyPublicInsurancesValue']:
                data.currencyCompanyPublicInsurancesValue ? data.currencyCompanyPublicInsurancesValue : '',
            ['billing.companyInsurance.publicInsurancesValue']:
                data.companyPublicInsurancesValue ? data.companyPublicInsurancesValue : 0,
            ['billing.companyInsurance.currencyEmployerInsuranceValue']:
                data.currencyCompanyEmployerInsuranceValue ? data.currencyCompanyEmployerInsuranceValue : '',
            ['billing.companyInsurance.employerInsuranceValue']:
                data.companyEmployerInsuranceValue ? data.companyEmployerInsuranceValue : 0
        };
    }

}

module.exports = TalentPayDetailsService;
