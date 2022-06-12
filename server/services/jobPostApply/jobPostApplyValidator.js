const validation = require('../validation');

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
     * @author Innovify
     * @since 27/10/2020
     */
    async applyJobPost () {
        await super.checkId(this.body.jobPostId);
    }
}

module.exports = JobPostValidator;
