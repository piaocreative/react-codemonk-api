const validation = require('../validation');
const Industry = require('../../models/industry.model')
/**
 * Class represents validations for client profile details.
 */
class ClientProfileValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate client profile put request
     * @author Innovify
     * @since 08/07/2020
     */
    async profile () {
        // const isClient = this.body.type === CONSTANTS.CLIENT_TYPES[1];
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        await super.checkJobTitle(this.body.jobTitle);

        // only company
        if (this.body.country) {
            await super.checkCountry(this.body.country);
        }
        if (this.body.timeZone) {
            await super.checkTimezone(this.body.timeZone);
        }
        await this.companyType(this.body.type);

        // only company
        await this.companyDetailsOld();
    }

    /**
     * @desc This function is being used to validate companyDetails
     * @author Innovify
     * @param {object} companyDetails companyDetails
     * @since 09/07/2020
     */
    async companyDetailsOld () {
        await this.companyName(this.body.companyName);
        await super.registeredNumber(this.body.companyregisteredNumber);
        await super.postcode(this.body.companyPincode);
        await super.city(this.body.companyCity);
        await super.country(this.body.companyCountry);
        await super.addressLineOne(this.body.companyAddressLineOne);
        await this.vatNumber(this.body.vatNumber);
        await super.firstName(this.body.authorityFirstName);
        await super.lastName(this.body.authorityLastName);
        await super.email(this.body.authorityEmail);
        await super.countryCode(this.body.authorityCountryCode);
        await super.phoneNumber(this.body.authorityPhoneNumber);
        await super.checkJobTitle(this.body.authorityJobTitle);
        if (this.body.authorityTimeZone) {
            await super.checkTimezone(this.body.authorityTimeZone);
        }
        if (this.body.authorityCountry) {
            await super.checkCountry(this.body.authorityCountry);
        }
    }
    
    /**
     * @desc This function is being used to validate client about put request
     * @author Innovify
     * @since 09/12/2021
     */
    async aboutYou () {
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        await super.checkJobTitle(this.body.jobTitle);
        await super.checkJobRole(this.body.jobRole);
    }

    /**
     * @desc This function is being used to validate companyDetails
     * @author Innovify
     * @param {object} companyDetails companyDetails
     * @since 09/07/2020
     */
     async companyDetails () {
        await this.companyLegalName(this.body.name);
        await this.companyBrand(this.body.brand);
        await super.registeredNumber(this.body.registeredNumber);
        await this.vatNumber(this.body.vatNumber);
        await this.industry(this.body.industry);
        await this.checkCompanyType(this.body.companyType);
        await super.companyCultures(this.body.cultures);

        super.linkedInUrl(this.body.linkedInUrl);
        super.gitHubUrl(this.body.gitHubUrl);
        super.stackOverFlowUrl(this.body.stackOverFlowUrl);
        super.dribbbleUrl(this.body.dribbbleUrl);
        super.behanceUrl(this.body.behanceUrl);
        super.otherWebsiteUrl(this.body.portfolioUrl);
    }

    /**
     * @desc This function is being used to validate client teamPreference
     * @author Codemonk
     * @since 15/12/2021
     */
    async industry (industry) {
        if (!industry) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Industry'), 400);
        } else {
            const dbIndustry = await Industry.findOne({ name: industry });
            if (!dbIndustry) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Industry'), 400);
            }
        }
    }

    /**
     * @desc This function is being used to validate client teamPreference
     * @author Codemonk
     * @since 15/12/2021
     */
    async checkCompanyType(companyType) {
        if (!_.includes(CONSTANTS.COMPANY_TYPE, companyType)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Company Type'), 400);
        }
    }

    /**
     * @desc This function is being used to validate client about put request
     * @author Innovify
     * @since 09/12/2021
     */
    async companyLocation () {
        await this.locationName(this.body.locationName);
        await super.postcode(this.body.postcode);
        await super.addressLineOne(this.body.addressLineOne);
        await super.city(this.body.city);
        await super.country(this.body.country);
        await super.timeZone(this.body.timezone);
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} companyName companyName of user
     */
    async locationName (locationName) {
        if (!locationName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} companyName companyName of user
     */
    async companyName (companyName) {
        if (!companyName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} companyLegalName companyLegalName of user
     */
     async companyLegalName (companyLegalName) {
        if (!companyLegalName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Legal Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} companyBrand 
     */
     async companyBrand (companyBrand) {
        if (!companyBrand) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Brand'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} companySize 
     */
     async companySize (companySize) {
        if (!companySize) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Size'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company name
     * @author Innovify
     * @since 08/07/2020
     * @param {String} culture 
     */
     async culture (culture) {
        if (!culture) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'culture'), 400);
        }
    }

    /**
     * @desc This function is being used to validate userDocumentFileType
     * @author Innovify
     * @param {String} type type of company can be from ['individual', 'company']
     * @since 09/07/2020
     */
    async companyType (type) {
        if (!type || CONSTANTS.CLIENT_TYPES.indexOf(type) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Company Type'), 400);
        }
    }

    /**
     * @desc This function is being used to validate vatNumber
     * @author Innovify
     * @since 09/07/2020
     * @param {string} vatNumber vatNumber of client user company
     */
    async vatNumber (vatNumber) {
        if (!vatNumber) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'VAT number'), 400);
        }
    }
}

module.exports = ClientProfileValidator;
