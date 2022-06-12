const validation = require('../addJobPost/addJobPostValidator');
/**
 * Class represents validations for client edit job post details.
 */
class EditJobPostValidator extends validation {
    constructor (body, local) {
        super(body, local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate edit job post
     * @author Innovify
     * @since 03/11/2020
     */
    async editJobPost () {
        await super.checkId(this.body.id);
        await super.jobPostValidation();
    }
}

module.exports = EditJobPostValidator;
