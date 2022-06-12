const validation = require('../../validation');
/**
 * Class represents validations for Talent Save Later.
 */
class TalentSaveLaterValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;

    }


    /**
     * @desc This function is being used to validate validationSaveLater step
     * @author Innovify
     * @since 10/06/2020
     */
    async validationSaveLater() {
        await this.signupStep(this.body.step);
    }

    /**
     * @desc This function is being used to validate signupStep
     * @author Innovify
     * @param {number} signupStep signupStep
     * @since 10/06/2020
     */
    async signupStep(signupStep) {
        if (!signupStep || signupStep < CONSTANTS.SIGNUP_STEP.MIN
            || signupStep > CONSTANTS.SIGNUP_STEP.MAX) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Step'), 400);
        }
    }
}

module.exports = TalentSaveLaterValidator;
