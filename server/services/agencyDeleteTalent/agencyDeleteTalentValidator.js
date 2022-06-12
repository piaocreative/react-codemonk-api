const validation = require('../validation');

/**
 * Class represents validations for agency talent add validation.
 */
class AgencyDeleteTalentValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add talents
     * @author Innovify
     * @since 28/08/2020
     */
    async validateDeleteTalent () {
        await super.email(this.body.email);
    }
}

module.exports = AgencyDeleteTalentValidator;
