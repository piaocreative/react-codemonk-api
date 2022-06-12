const validation = require('../validation');
const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents validations for Talent Pay Details.
 */
class TalentPayDetailsValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate pay details
     * @author Innovify
     * @since 09/06/2020
     */
    async validationPayDetails() {
        super.currency(this.body.currency);
        super.ratePerHour(this.body.ratePerHour);
        this.billingType(this.body.billingType);
        this.payType(this.body.payType);
    }

    /**
     * @desc This function is being used to validate billingType
     * @author Innovify
     * @param {string} billingType billingType
     * @since 09/06/2020
     */
    billingType(billingType) {
        if (!billingType || CONSTANTS.BILLING_TYPES.indexOf(billingType) === -1) {
            throw new CodeMonkError(this.__(this.SELECT, 'Billing type'), 400);
        }
    }

    /**
     * @desc This function is being used to validate payType
     * @author Innovify
     * @param {string} payType payType
     * @since 09/06/2020
     */
    payType(payType) {
        if (!payType || CONSTANTS.PAYOUT_TYPES.indexOf(payType) === -1) {
            throw new CodeMonkError(this.__(this.SELECT, 'Pay Type'), 400);
        }
    }

    /**
     * @desc This function is being used to validate paypalEmail
     * @author Innovify
     * @param {string} paypalEmail paypalEmail
     * @since 09/06/2020
     */
    paypalEmail(email) {
        if (!email) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Email'), 400);
        }
        if (!CONSTANTS.REGEX.EMAIL.test(email)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Email'), 400);
        }
    }

    /**
     * @desc This function is being used to validate bankDetails
     * @author Innovify
     * @param {object} bankDetails bankDetails
     * @since 09/06/2020
     */
    bankDetails() {
        if (!this.body.bankName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Bank Name'), 400);
        }
        if (!this.body.bankAccountNumber) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Bank account number'), 400);
        }
        if (!this.body.bankCode) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Bank Code'), 400);
        }
    }

    /**
     * @desc This function is being used to validate companyDetails
     * @author Innovify
     * @param {object} companyDetails companyDetails
     * @since 09/06/2020
     */
    async companyDetails() {
        if (!this.body.companyName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Name'), 400);
        }
        if (!this.body.companyregisteredNumber) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Register Number'), 400);
        }
        if (!this.body.companyPincode) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Pincode'), 400);
        }
        if (!this.body.companyCity) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company City'), 400);
        }
        if (!this.body.companyAddressLineOne) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company address line one'), 400);
        }


        if ((this.body.companyProfessionInsuranceValue
            && isNaN(this.body.companyProfessionInsuranceValue))) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Professional Insurance Value'), 400);
        }
        if (this.body.companyPublicInsurancesValue && isNaN(this.body.companyPublicInsurancesValue)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Public Insurance Value'), 400);
        }
        if (this.body.companyEmployerInsuranceValue
            && isNaN(this.body.companyEmployerInsuranceValue)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Employer Insurance Valud'), 400);
        }

        await super.country(this.body.companyCountry);
    }

    /**
     * @desc This function is being used to validate validateBillingType
     * @author Innovify
     * @param {string} validateBillingType validateBillingType
     * @since 09/06/2020
     */

    async validateBillingType() {
        if (this.body.billingType === CONSTANTS.BILLING_TYPES_COMPANY) {
            await this.companyDetails();
        }
    }

    /**
     * @desc This function is being used to validate validatePayType
     * @author Innovify
     * @param {string} validatePayType validatePayType
     * @since 09/06/2020
     */
    async validatePayType() {
        if (this.body.payType === CONSTANTS.PAYOUT_TYPES_PAYPAL) {
            await this.paypalEmail(this.body.payPalEmail);
        } else {
            await this.bankDetails();
        }
    }

    async checkActiveProject(id, adminAllowed = false) {
        if (!adminAllowed) {
            const projects = await Project.find({ 'talents.talentId': id }).select('talents.$ status')
            const activeProjectStatus = [CONSTANTS.PROJECT.STATUS['Discovery'],
            CONSTANTS.PROJECT.STATUS['Kick-off'],
            CONSTANTS.PROJECT.STATUS['In Progress']]
            let statues = []
            for (const p of projects) {
                let statusState = activeProjectStatus.includes(p.status)
                let durationState = false;
                for (const t of p.talents) {
                    if (id.toString() === t.talentId.toString()) {
                        durationState = await Utils.isBetween(t.startDate, t.endDate)
                    }
                }
                statues.push(statusState && durationState)
            }
            const hasActiveProject = statues.length > 0 && statues.some(e => e === true);
            if (hasActiveProject) {
                throw new CodeMonkError(this.__('INVALID_RATE_CHANGE'), 400);
            }
        }
    }


}

module.exports = TalentPayDetailsValidator;
