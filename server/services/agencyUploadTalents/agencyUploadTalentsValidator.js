const validation = require('../validation');
const Currencies = require('../../util/currency');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents validations for agency talent add validation.
 */
class AgencyAddTalentsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate validateUserDocumentUpload
     * @author Innovify
     * @param {file} validateUserDocumentUpload validateUserDocumentUpload
     * @since 29/09/2020
     */

    async validateUploadTalentsFile (file) {
        if (!file) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'File'), 400);
        }
        await this.uploadTalentsFileType(file.mimetype);
    }

    /**
     * @desc This function is being used to validate uploadTalentsFileType
     * @author Innovify
     * @param {file} uploadTalentsFileType uploadTalentsFileType
     * @since 29/09/2020
     */
    async uploadTalentsFileType (mimeType) {
        if (!mimeType || !CONSTANTS.AGENCY_UPLOAD_TALNET_FILE.ALLOWED_TYPE.includes(mimeType) ) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'CSV, XLS and XLSX' ), 400);
        }
    }

    getValidTalents (talents) {
        const validTalents = [];
        talents.filter((d) => {
            let isValid = true;

            if (!this.firstName(d.firstName)) {
                isValid = false;
            }
            if (!this.lastName(d.lastName)) {
                isValid = false;
            }
            if (!this.email(d.email)) {
                isValid = false;
            }
            if (!this.currency(d.currency)) {
                isValid = false;
            }
            if (!this.ratePerHour(d.rate)) {
                isValid = false;
            }

            if (isValid) {
                validTalents.push(d);
            }
        });

        return validTalents;
    }

    firstName (firstName) {
        if (!firstName
            || CONSTANTS.LENGTH.NAME.MIN > firstName.length
            || CONSTANTS.LENGTH.NAME.MAX < firstName.length) {
            return false;
        }
        return true;
    }

    lastName (lastName) {
        if (!lastName
            || CONSTANTS.LENGTH.NAME.MIN > lastName.length
            || CONSTANTS.LENGTH.NAME.MAX < lastName.length) {
            return false;
        }
        return true;
    }

    email (email) {
        if (!email || !CONSTANTS.REGEX.EMAIL.test(email)) {
            return false;
        }
        return true;
    }

    /**
     * @desc This function is being used to validate currency
     * @author Innovify
     * @param {string} currency currency
     * @since 28/08/2020
     */
    currency (currency) {
        const isCurrencyValid = this.currencyCheck(currency);
        if (!currency || !isCurrencyValid) {
            return false;
        }
        return true;
    }

    /**
     * @desc This function is being used to validate currency
     * @author Innovify
     * @param {string} currency currency
     * @since 28/08/2020
     */
    currencyCheck (currency) {
        let isCurrencyValid = false;
        Currencies.map((d) => {
            if (d.value === currency) {
                isCurrencyValid = true;
                return;
            }
        });
        return isCurrencyValid;
    }

    /**
     * @desc This function is being used to validate ratePerHour
     * @author Innovify
     * @param {string} ratePerHour ratePerHour
     * @since 28/08/2020
     */
    ratePerHour (ratePerHour) {
        const { MIN, MAX } = CONSTANTS.HOURLY_RATE;
        if (!ratePerHour || isNaN(ratePerHour) || MIN > ratePerHour || MAX < ratePerHour) {
            return false;
        }

        return true;
    }
}

module.exports = AgencyAddTalentsValidator;
