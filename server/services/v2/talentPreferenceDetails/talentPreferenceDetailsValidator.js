const validation = require('../../validation');
const Industry = require('../../../models/industry.model');
const CompanyCulture = require('../../../models/companyCulture.model');

/**
 * Class represents validations for Talent Preference Details.
 */
class TalentPreferenceDetailsValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate preference details save for talent request
     * @author CodeMonk
     * @since 28/10/2021
     */
    async validationPreferenceDetails() {
        await this.industries(this.body.industries);
        await this.companyCultures(this.body.companyCultures);
        this.companyType(this.body.companyType);
        this.preferredProjectDuration(this.body.preferredProjectDuration);
        await super.teamPreference(this.body.teamPreference);
        await super.assignments(this.body.assignments);
        await super.workPreference(this.body.workPreference);
        //await this.availability(this.body.availability);
        //await this.unavailability(this.body.unavailability);
    }

    async industries(industries) {
        if (!industries || !Array.isArray(industries) || !industries.length) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Industry'), 400);
        }
        await this.checkIndustryInDB(industries);
    }

    async checkIndustryInDB(industries) {
        const dbIndustries = await Industry.find({ name: { $in: industries } }).select('name');
        const dbIndustriesName = dbIndustries.map(db => { return db.name; });
        const reduceIndustries = industries.filter(di => !dbIndustriesName.includes(di));
        if (reduceIndustries && reduceIndustries.length > 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Industry'), 400);
        }
    }

    async companyCultures(companyCultures) {
        if (!companyCultures || !Array.isArray(companyCultures) || !companyCultures.length) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Culture'), 400);
        }
        await this.checkCompanyCultureInDB(companyCultures);
    }

    async checkCompanyCultureInDB(companyCultures) {
        const dbCompanyCultures = await CompanyCulture.find({ name: { $in: companyCultures } }).select('name');
        const dbCompanyCulturesName = dbCompanyCultures.map(db => { return db.name; });
        const reduceCompanyCultures = companyCultures.filter(di => !dbCompanyCulturesName.includes(di));
        if (reduceCompanyCultures && reduceCompanyCultures.length > 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Company Culture'), 400);
        }
    }

    /**
     * @desc This function is being used to validate availability
     * @author CodeMonk
     * @since 28/10/2021
     * @param {Boolean} availability availability of user
     */
    async availability(availability) {
        if (availability && typeof availability !== 'boolean') {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Availability'), 400);
        }
    }

    /**
     * @desc This function is being used to validate unavailability
     * @author CodeMonk
     * @since 28/10/2021
     * @param {string} unavailability unavailability of user
     */
    async unavailability(unavailability) {
        if (unavailability) {
            if (!Array.isArray(unavailability)) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Unavailability'), 400);
            }
            await this.checkUnavailability(unavailability);
        }
    }

    /**
     * @desc This function is being used to check unavailability has correct data
     * @author CodeMonk
     * @since 28/10/2021
     * @param {Array} unavailability unavailability of user
     */
    async checkUnavailability(unavailability) {
        unavailability.map((l) => {
            if (!l.date || !l.key || CONSTANTS.TIME_HOURS.indexOf(l.key) === -1) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Unavailability'), 400);
            }
        });
    }
}

module.exports = TalentPreferenceDetailsValidator;
