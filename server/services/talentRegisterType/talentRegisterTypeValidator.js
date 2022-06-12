const validation = require('../validation');
/**
 * Class represents validations for Talent register type selection.
 */
class TalentRegisterTypeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate check talent register type
     * @author Innovify
     * @since 26/08/2020
     */
    validationRegisterType (registerType) {
        if (!registerType || !Object.values(CONSTANTS.TALENT_REGISTER_TYPE).includes(registerType) ) {
            throw new CodeMonkError(this.__(this.SELECT, 'Register Type'), 400);
        }
    }
}

module.exports = TalentRegisterTypeValidator;
