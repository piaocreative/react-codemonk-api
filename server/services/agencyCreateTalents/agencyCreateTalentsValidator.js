const validation = require('../validation');

/**
 * Class represents validations for agency talent add validation.
 */
class AgencyCreateTalentValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate create and invite talent
     * @author Innovify
     * @since 04/09/2020
     */
    async validateTalent () {
        await this.firstName(this.body.firstName);
        await this.lastName(this.body.lastName);
        await this.email(this.body.email);
        this.currency(this.body.currency);
        this.ratePerHour(this.body.rate);
    }
}

module.exports = AgencyCreateTalentValidator;
