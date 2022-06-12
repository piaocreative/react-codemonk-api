const validation = require('../validation');
/**
 * Class represents validations for Talent Basic Profile.
 */
class TalentBasicProfileValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate personal details save inputs
     * @author Innovify
     * @since 04/06/2020
     */
    async validationPersonalDetails () {
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        await super.countryCode(this.body.countryCode);
        await super.phoneNumber(this.body.phoneNumber);
        super.checkDate(this.body.dob, 'DOB');
        await super.gender(this.body.gender);
        await super.postcode(this.body.postcode);
        await super.addressLineOne(this.body.addressLineOne);
        await super.city(this.body.city);
        await super.country(this.body.country);
        await super.language(this.body.language);
        await super.timeZone(this.body.timeZone);
    }
}

module.exports = TalentBasicProfileValidator;
