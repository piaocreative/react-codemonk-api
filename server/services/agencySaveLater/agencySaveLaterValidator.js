const validation = require('../validation');
/**
 * Class represents validations for agency save later validation
 */
class AgencySaveLaterValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate client profile
     * @author Innovify
     * @since 27/08/2020
     */
    async validateStep (step) {
        if (!step || step > 6 || step < 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Step'), 400);
        }
    }
}

module.exports = AgencySaveLaterValidator;
