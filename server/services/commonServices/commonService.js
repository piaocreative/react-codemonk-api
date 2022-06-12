const Talent = require('../../models/talent.model');
const Currencies = require('../../util/currency');

/**
 * Class represents services for talent project list based on status
 */
class CommonService {
    static async checkAndCompleteFreelancerProfile (talentDetails) {
        const rateValid = CommonService.checkDailyRate(talentDetails.currency, talentDetails.ratePerHour);
        if (!rateValid) {
            return false;
        }

        const proofValid = CommonService.checkProofs(talentDetails.idProofUrl, talentDetails.addressProofUrl);
        if (!proofValid) {
            return false;
        }

        const payValid = CommonService.checkPayDetails(talentDetails.pay);
        if (!payValid) {
            return false;
        }

        const billingDetails = CommonService.checkBillingDetails(talentDetails.billing);
        if (!billingDetails) {
            return false;
        }

        await Talent.updateOne({
            _id: talentDetails._id
        }, {
            signupStep: CONSTANTS.CLIENT.REGITRATION_STATUS.PAY_DETAIL
        });
        return true;
    }

    static checkDailyRate (currency, ratePerHour) {
        let currencyValid = false;
        if (currency) {
            currencyValid = Currencies.some((d) => {
                return (d.value === currency);
            });
        }
        return currencyValid && ratePerHour;
    }

    static checkProofs (idProofUrl, addressProofUrl) {
        return idProofUrl && addressProofUrl;
    }

    static checkPayDetails (payDetails) {
        return (payDetails && payDetails.type === CONSTANTS.PAYOUT_TYPES_PAYPAL && payDetails.payPalEmail) ||
        (payDetails
            && payDetails.type === CONSTANTS.PAYOUT_TYPES_BANK
            && payDetails.bankDetails.name
            && payDetails.bankDetails.accNumber
            && payDetails.bankDetails.bankCode);

    }

    static checkBillingDetails (billingDetails) {
        if (billingDetails && billingDetails.type === CONSTANTS.BILLING_TYPES_COMPANY) {
            return CommonService.checkCompanyDetails(billingDetails);
        }
        return billingDetails && billingDetails.type === CONSTANTS.BILLING_TYPES_FL;
    }

    static checkCompanyDetails (billingDetails) {
        return (billingDetails.companyDetails.name
            && billingDetails.companyDetails.registeredNumber
            && billingDetails.companyDetails.addressLineOne
            && billingDetails.companyDetails.city
            && billingDetails.companyDetails.country
            && billingDetails.companyDetails.postcode
            && billingDetails.companyInsurance.professionInsuranceValue > 0
            && billingDetails.companyInsurance.publicInsurancesValue > 0
            && billingDetails.companyInsurance.employerInsuranceValue > 0
            && billingDetails.companyDocument.incorporationCertificateUrl
            && billingDetails.companyDocument.vatRegistrationCertificateUrl
            && billingDetails.companyDocument.insuranceDocumentUrl);
    }
}

module.exports = CommonService;
