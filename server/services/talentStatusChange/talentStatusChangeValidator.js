const validation = require('../validation');
/**
 * Class represents validations for change talent validation
 */
class TalentStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add talent
     * @author Innovify
     * @since 27/11/2020
     */
    async talentStatusChange () {
        await this.checkId(this.body.talentId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate talent status
     * @author Innovify
     * @param {Number} status status
     * @since 27/11/2020
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 1 || status > 2) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Profile Status'), 400);
        }
    }
}

module.exports = TalentStatusChangeValidator;
