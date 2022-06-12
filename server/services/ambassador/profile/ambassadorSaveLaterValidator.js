const validation = require('../../validation');

/**
 * Class represents validations for ambassador save later validation
 */
class AmbassadorSaveLaterValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate ambassador profile
     */
    async validateStep (step) {
        if (!step || step > 3 || step < 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Step'), 400);
        }
    }
}

module.exports = AmbassadorSaveLaterValidator;
