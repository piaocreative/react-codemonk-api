const validation = require('../validation');
/**
 * Class represents validations for Talent About You.
 */
class TalentAboutYouValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate personal details save inputs
     * @author CodeMonk
     * @since 30/09/2021
     */
    async validationPersonalDetails() {
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        await super.countryCode(this.body.countryCode);
        await super.phoneNumber(this.body.phoneNumber);
        super.checkDate(this.body.dob, 'DOB');
        await super.gender(this.body.gender);
        await this.primaryRole(this.body.primaryRole);
        await this.yearsOfExperience(this.body.yearsOfExperience);

        await super.postcode(this.body.postcode);
        await super.addressLineOne(this.body.addressLineOne);
        await super.city(this.body.city);
        //await super.state(this.body.state);
        await super.country(this.body.country);
        await super.language(this.body.language);
        await super.timeZone(this.body.timeZone);
        super.linkedInUrl(this.body.linkedInUrl);
        super.gitHubUrl(this.body.gitHubUrl);
        super.stackOverFlowUrl(this.body.stackOverFlowUrl);
        super.dribbbleUrl(this.body.dribbbleUrl);
        super.behanceUrl(this.body.behanceUrl);
        super.otherWebsiteUrl(this.body.portfolioUrl);

    }

    /**
     * @desc This function is being used to validate primaryRole
     * @author CodeMonk
     * @since 30/09/2021
     * @param {string} primaryRole primaryRole of user
     */
    async primaryRole(primaryRole) {
        if (!primaryRole || CONSTANTS.PRIMARY_ROLE.indexOf(primaryRole) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Primary Role'), 400);
        }
    }

    /**
     * @desc This function is being used to validate yearsOfExperience
     * @author CodeMonk
     * @since 30/09/2021
     * @param {string} yearsOfExperience yearsOfExperience of user
     */
    async yearsOfExperience(yearsOfExperience) {
        if (!yearsOfExperience
            || CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(yearsOfExperience) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Years of Experience'), 400);
        }
    }
}

module.exports = TalentAboutYouValidator;
