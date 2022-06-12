const validation = require('../validation');
const UploadService = require('../../util/uploadService');
/**
 * Class represents validations for agency profile validation
 */
class AgencyProfileValidator extends validation {
    /**
     * @typedef {Object} AgencyProfileValidator
     * @param {Object} body Data to test
     * @param {Function} local function for i18n
     */
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate client profile
     * @author Innovify
     * @since 27/08/2020
     */
    async validateProfile (user) {
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        this.designation(this.body.designation);
        if (user.signupStep < CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
            await super.countryCode(this.body.countryCode);
            await super.phoneNumber(this.body.phoneNumber);
        }
        this.agencyName(this.body.agencyName);
        await super.registeredNumber(this.body.registeredNumber);
        await super.postcode(this.body.agencyPostCode);
        await super.addressLineOne(this.body.agencyAddressLineOne);
        await super.city(this.body.agencyCity);
        await super.country(this.body.agencyCountry);
        this.vatNumber(this.body.agencyVatNumber);
        this.tradingName(this.body.tradingName);
        this.tradingWebsite(this.body.tradingWebsite);
        this.tradingSummary(this.body.tradingSummary);
        await super.postcode(this.body.tradingPostCode);
        await super.addressLineOne(this.body.tradingAddressLineOne);
        await super.city(this.body.tradingCity);
        await super.country(this.body.tradingCountry);
    }

    /**
     * @desc This function is being used to validate client designation
     * @author Innovify
     * @param designation designation
     * @since 27/08/2020
     */
    designation (designation) {
        if (!designation) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Designation'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.DESIGNATION;
        if (MIN > designation.length || MAX < designation.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Designation', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate client agency name
     * @author Innovify
     * @param agencyName agencyName
     * @since 27/08/2020
     */
    agencyName (agencyName) {
        if (!agencyName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Agency Name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.NAME;
        if (MIN > agencyName.length || MAX < agencyName.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Agency Name', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate client vatNumber
     * @author Innovify
     * @param vatNumber vatNumber
     * @since 27/08/2020
     */
    vatNumber (vatNumber) {
        if (!vatNumber) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'VAT Number'), 400);
        }
    }

    /**
     * @desc This function is being used to validate client trading name
     * @author Innovify
     * @param tradingName tradingName
     * @since 27/08/2020
     */
    tradingName (tradingName) {
        if (!tradingName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Trading Name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.AGENCY.TRADE_NAME;
        if (MIN > tradingName.length || MAX < tradingName.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Trading Name', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate client trading website
     * @author Innovify
     * @param tradingWebsite tradingWebsite
     * @since 27/08/2020
     */
    tradingWebsite (tradingWebsite) {
        this.website(tradingWebsite, 'Trading Website');
    }

    /**
     * @desc This function is being used to validate client trading summary
     * @author Innovify
     * @param tradingSummary tradingSummary
     * @since 27/08/2020
     */
    tradingSummary (tradingSummary) {
        if (!tradingSummary) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Trading Summary'), 400);
        }
        const count = super.countHTML(tradingSummary);
        const { MIN, MAX } = CONSTANTS.AGENCY.TRADE_SUMMARY;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Trading Summary', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate validateTradingLogo
     * @author Innovify
     * @param {file} validateTradingLogo validateTradingLogo
     * @since 27/08/2020
     */
    async validateTradingLogo (file) {
        await this.userDocumentFileType(file.mimetype);
        await this.userDocumentFileSize(file.size);
    }

    /**
     * @desc This function is being used to validate userDocumentFileType
     * @author Innovify
     * @param {file} userDocumentFileType userDocumentFileType
     * @since 27/08/2020
     */
    async userDocumentFileType (mimeType) {
        if (!mimeType || !CONSTANTS.PROFILE_PICTURE.ALLOWED_TYPE.includes(mimeType)) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'PNG, JPG and JPEG'), 400);
        }
    }

    /**
     * @desc This function is being used to validate fileSize
     * @author Innovify
     * @param {string} fileSize fileSize
     * @since 27/08/2020
     */
    async userDocumentFileSize (fileSize) {
        const { MIN_SIZE, MAX_SIZE } = CONSTANTS.PROFILE_PICTURE;
        if (!fileSize || fileSize < MIN_SIZE || fileSize > MAX_SIZE) {
            throw new CodeMonkError(this.__(this.FILE_SIZE, {
                MIN: UploadService.bytesToSize(MIN_SIZE),
                MAX: UploadService.bytesToSize(MAX_SIZE)
            }), 400);
        }
    }
}

module.exports = AgencyProfileValidator;
