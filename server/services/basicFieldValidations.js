const countryList = require('../util/country');
const timeZoneList = require('../util/timeZone');
const mongoose = require('mongoose');
const CodeMonkError = require('../util/CodeMonkError');
const NOT_VALID = 'FIELD_NOT_VALID';
const REQUIRED = 'FIELD_REQUIRED';
const SELECT = 'FIELD_SELECT_REQUIRED';
const LENGTH = 'FIELD_LENGTH';
const FILE_TYPE_NOT_VALID = 'FILE_TYPE_NOT_VALID';
const FILE_SIZE = 'FILE_SIZE';
const ARRAY_LENGTH = 'ARRAY_LENGTH';
const moment = require('moment');
const MailChecker = require('mailchecker');
const languages = require('../util/languageISO');

/**
 * Created by Innovify on 04/06/2020
 * @name signUpValidator
 */
class BasicFieldValidation {
    constructor(local) {
        this.NOT_VALID = NOT_VALID;
        this.REQUIRED = REQUIRED;
        this.SELECT = SELECT;
        this.LENGTH = LENGTH;
        this.FILE_TYPE_NOT_VALID = FILE_TYPE_NOT_VALID;
        this.FILE_SIZE = FILE_SIZE;
        this.FILE_SIZE = FILE_SIZE;
        this.ARRAY_LENGTH = ARRAY_LENGTH;

        if (local) {
            this.__ = local;
        }
    }

    /**
     * @desc This function is being used to validate email address
     * @author Innovify
     * @since 08/01/2020
     * @param {string} email Email
     */
    async email(email) {
        if (!email) {
            throw new CodeMonkError(this.__(REQUIRED, 'Email'), 400);
        }
        if (!CONSTANTS.REGEX.EMAIL.test(email)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Email'), 400);
        }

        if (!(email.indexOf('non-disposable') !== -1) && (process.env.NODE_ENV === 'production' || email.indexOf('disposable') !== -1) && !MailChecker.isValid(email)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Email'), 400);
        }
    }

    /**
     * @desc This function is being used to signUp user
     * @author Innovify
     * @since 08/01/2020
     * @param {string} password Password
     */
    async password(password) {
        if ((!password || password.length !== 64)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Password'), 400);
        }
    }

    /**
     * @desc This function is being used to validate firstname
     * @author Innovify
     * @since 03/06/2020
     * @param {string} firstName firstName
     */
    async firstName(firstName, field = 'First Name') {
        if (!firstName) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        const { MIN, MAX } = CONSTANTS.LENGTH.NAME;
        if (MIN > firstName.length || MAX < firstName.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: field, MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate lastName
     * @author Innovify
     * @since 03/06/2020
     * @param {string} lastName surname of user
     */
    async lastName(lastName, field = 'Last Name') {
        if (!lastName) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        const { MIN, MAX } = CONSTANTS.LENGTH.NAME;
        if (MIN > lastName.length || MAX < lastName.length) {
            throw new CodeMonkError(this.__('FIELD_LENGTH', {
                FIELD: field, MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate countryCode
     * @author Innovify
     * @since 03/06/2020
     * @param {string} countryCode countryCode of user phine number
     */
    async countryCode(countryCode, field = 'Country Code') {
        if (!countryCode) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        if (countryCode.length > CONSTANTS.PHONE_NUMBER.COUNTRY_CODE_LENGTH) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate phoneNumber
     * @author Innovify
     * @since 03/06/2020
     * @param {string} phoneNumber phoneNumber of user
     */
    async phoneNumber(phoneNumber, field = 'Phone Number') {
        if (!phoneNumber) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        if (phoneNumber.length > CONSTANTS.PHONE_NUMBER.LENGTH) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate date in DD/MM/YYYY format
     * @author Innovify
     * @since 16/06/2020
     * @param {String} date date
     */
    checkDate(date, field = 'Date of birth') {
        if (date) {
            const dobDate = moment(date, 'DD/MM/YYYY');
            if (dobDate.isValid()) {
                return dobDate;
            } else {
                throw new CodeMonkError(this.__(NOT_VALID, field), 400);
            }
        } else {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate gender
     * @author Innovify
     * @since 03/06/2020
     * @param {string} gender gender of user
     */
    async gender(gender) {
        if (!gender || CONSTANTS.GENDER.indexOf(gender) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Gender'), 400);
        }
    }

    /**
     * @desc This function is being used to validate postcode
     * @author Innovify
     * @since 03/06/2020
     * @param {string} postcode postcode of user
     */
    async postcode(postcode, field = 'Postcode') {
        if (!postcode) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate addressLineOne
     * @author Innovify
     * @since 03/06/2020
     * @param {string} addressLineOne addressLineOne of user
     */
    async addressLineOne(addressLineOne, field = 'Address line one') {
        if (!addressLineOne) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate city
     * @author Innovify
     * @since 03/06/2020
     * @param {string} city city of user
     */
    async city(city, field = 'City') {
        if (!city) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
    }
    
    async state(state, field = 'State') {
        if (!state) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate country
     * @author Innovify
     * @since 03/06/2020
     * @param {string} country country of user
     */
    async country(country, field = 'Country') {
        if (!country) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        await this.checkCountry(country);
    }

    async checkCountry(country, field = 'Country') {
        const isCountryNameValid = countryList.some((d) => {
            return d.name === country;
        });
        if (!isCountryNameValid) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate language
     * @author Innovify
     * @since 03/06/2020
     * @param {string} language language of user
     */
    async language(language, field = 'Language') {
        if (!language || !language.length) {
            throw new CodeMonkError(this.__(SELECT, field), 400);
        }
        await this.languagecheck(language, field);
    }

    async languagecheck(language, field = 'Language') {
        const { MIN, MAX } = CONSTANTS.LENGTH.RATE;
        language.forEach((l) => {
            if (!l.name) {
                throw new CodeMonkError(this.__(SELECT, field), 400);
            }
            if (!l.rate || l.rate < MIN || l.rate > MAX) {
                throw new CodeMonkError(this.__(SELECT, `${field} rate`), 400);
            }
        });
    }

    async languageWithoutRate(language, field = 'Language') {
        if (!language || !language.length || language.length === 0) {
            throw new CodeMonkError(this.__(SELECT, field), 400);
        }
        await this.languageWithoutRateCheck(language, field);
    }

    async languageWithoutRateCheck(language, field = 'Language') {
        language.forEach((l) => {
            if (!l) {
                throw new CodeMonkError(this.__(SELECT, field), 400);
            }

            const isValid = this.languageCheck(l);
            if (!isValid) {
                throw new CodeMonkError(this.__(NOT_VALID, field), 400);
            }
        });
    }

    languageCheck(language) {
        return languages.some((d) => {
            return d.language === language;
        });
    }



    /**
     * @desc This function is being used to validate timeZone
     * @author Innovify
     * @since 03/06/2020
     * @param {string} timeZone timeZone of user
     */
    async timeZone(timeZone, field = 'Timezone') {
        if (!timeZone) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        await this.checkTimezone(timeZone, field);
    }

    /**
     *
     * @param {Array} timeZone
     */
    checkTimezone(timeZone, field = 'Timezone') {
        const isValid = timeZoneList.some((d) => {
            return d.name === timeZone;
        });
        if (!isValid) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate id is not blank
     * @author Innovify
     * @param {string} id id
     * @since 23/06/2020
     */
    async checkId(id, field = 'Id') {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
        return mongoose.Types.ObjectId(id);
    }

    /**
     * @desc This function is being used to validate start date & end date
     * @author Innovify
     * @param {date} startDate startDate
     * @param {date} endDate endDate
     * @since 23/06/2020
     */
    async checkStartEndDate(startDate, endDate) {
        if (endDate < startDate) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Date'), 400);
        }
    }

    /**
     * @desc This function is being used to count html length
     * @author Innovify
     * @param {string} html html
     * @since 25/06/2020
     */
    countHTML(html) {
        return html.replace(/<[^>]*>?/gm, '').length;
    }

    /**
     *
     * @param {URL} URL
     * @param {string} field  Field Name
     */
    website(URL, field = 'Website') {
        if (!URL) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        if (!CONSTANTS.REGEX.URL.test(URL)) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }
}

module.exports = BasicFieldValidation;
