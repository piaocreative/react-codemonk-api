const validation = require('../validation');
/**
 * Class represents validations for admin change project validation
 */
class TalentStatusChangeForProjectValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate change project talent status
     * @author Innovify
     * @since 21/09/2020
     */
    async TalentStatusChangeForProjectByAdmin () {
        await this.checkId(this.body.projectId);
        await this.checkId(this.body.talentId);
        this.status(this.body.status);
        
    }

    /**
     * @desc This function is being used to validate project talent status
     * @author Innovify
     * @param {Number} status status
     * @since 21/09/2020
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 0 || status > 1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project Status'), 400);
        }
    }
}

module.exports = TalentStatusChangeForProjectValidator;
