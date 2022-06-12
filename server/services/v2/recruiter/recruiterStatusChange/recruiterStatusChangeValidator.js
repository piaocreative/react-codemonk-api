const validation = require('../../../validation');
/**
 * Class represents validations for change recruiter validation
 */
class RecruiterStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add recruiter
     * @author CodeMonk
     * @since 15/02/2022
     */
    async recruiterStatusChange () {
        await super.checkId(this.body.recruiterId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate recruiter status
     * @author CodeMonk
     * @param {Number} status status
     * @since 15/02/2022
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 1 || status > 2) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
        }
    }
}

module.exports = RecruiterStatusChangeValidator;
