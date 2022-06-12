const validation = require('../../../validation');
const {
    BRIEF: { TALENT: {
        STATUS: { VALID_ACTION_LIST }
    } }
} = require('../../../../util/constants');
/**
 * Class represents validations for admin change job post validation
 */
class TalentStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate change job post talent status
     * @author CodeMonk
     * @since 16/02/2022
     */
    async TalentStatusChangeByAdmin () {
        await this.checkId(this.body.jobPostId);
        await this.checkId(this.body.talentId);
        this.status(this.body.status);

    }

    /**
     * @desc This function is being used to validate project talent status
     * @author CodeMonk
     * @param {Number} status status
     * @since 16/02/2022
     */
    status (status, message = 'Talent Status') {
        if (status === undefined || isNaN(status) || status < 0 || status > 5) {
            throw new CodeMonkError(this.__(this.NOT_VALID, message), 400);
        }
    }


    /**
     * @desc This function is being used to validate date in DD/MM/YYYY format
     * @author Innovify
     * @since 16/06/2020
     * @param {Array} expectedStatus Array of expected status
     */
    checkStatus (expectedStatus) {
        if (!expectedStatus.includes(parseInt(this.body.status))) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Talent Status'), 400);
        }
        return this.body.status;
    }

    /**
     *
     * @param {string} currentStatus
     * @param {string} role
     */
    checkStatusUpdate (currentStatus) {
        this.status(currentStatus, 'Talent Exist Status');
        this.checkStatus(VALID_ACTION_LIST[currentStatus]);
        return this.body.status;
    }

    /**
     * @desc This function is being used to validate project talent status
     * @author Innovify
     * @param {Number} status status
     * @since 21/09/2020
     */
    checkJobPost (status) {
        if (status === undefined || isNaN(status) || status < 0 || status > 5) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Talent Status'), 400);
        }
    }
}

module.exports = TalentStatusChangeValidator;
