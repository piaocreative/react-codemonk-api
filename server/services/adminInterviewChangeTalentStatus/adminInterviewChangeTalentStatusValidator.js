const validation = require('../validation');
/**
 * Class represents validations for admin change interview status validation
 */
class AdminInterviewChangeTalentStatusValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to admin change interview status validation
     * @author Innovify
     * @since 09/10/2020
     */
    async changeTalentInteviewStatusByAdmin () {
        await super.checkId(this.body.interviewId);
        this.checkStatus(this.body.status);
    }

    /**
     * @desc This function is being used to admin change interview status validation
     * @author Innovify
     * @since 09/10/2020
     */
    checkStatus (status) {
        if (status === undefined || status < 0 || status > 1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Interview Status'), 400);
        }
    }


}

module.exports = AdminInterviewChangeTalentStatusValidator;
