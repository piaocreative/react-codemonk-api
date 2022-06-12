const validation = require('../validation');

/**
 * Class represents validations for agency agency pay details validation.
 */
class AgencyPayDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate agency pay details
     * @author Innovify
     * @since 31/08/2020
     */
    async validatePayDetails () {
        this.bankName(this.body.bankName);
        this.accountNumber(this.body.bankAccountNumber);
        this.bankCode(this.body.bankCode);
    }

    /**
     * @desc This function is being used to validate agency pay details
     * @author Innovify
     * @param bankName name of the bank
     * @since 31/08/2020
     */
    bankName (bankName) {
        if (!bankName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Bank Name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.PAY_DETAILS.BANK_NAME;
        if (MIN > bankName.length || MAX < bankName.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Bank Name', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate agency pay details
     * @author Innovify
     * @param accountNumber account number of the bank
     * @since 31/08/2020
     */
    accountNumber (accountNumber) {
        if (!accountNumber) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Account Number'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.PAY_DETAILS.ACCOUNT_NUMBER;
        if (MIN > accountNumber.length || MAX < accountNumber.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Account Number', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate agency pay details
     * @author Innovify
     * @param bankCode code of branch of the bank
     * @since 31/08/2020
     */
    bankCode (bankCode) {
        if (!bankCode) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Bank Code'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.PAY_DETAILS.IFSC_CODE;
        if (MIN > bankCode.length || MAX < bankCode.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Bank Code', MIN, MAX
            }), 400);
        }
    }
}

module.exports = AgencyPayDetailsValidator;
