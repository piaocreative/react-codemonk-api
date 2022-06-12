const validation = require('../../validation');

/**
 * Class represents validations for agency talent add validation.
 */
class JobPostValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate apply job post
     * @author CodeMonk
     * @since 23/11/2021
     */
    async applyJobPost () {
        await super.checkId(this.body.jobPostId);
        super.notesOfMotivation(this.body.notesOfMotivation);
        this.checkDate(this.body.availableJoiningDate, 'Start date');

    }
}

module.exports = JobPostValidator;
