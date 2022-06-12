const validation = require('../addJobPostBasicDetails/addJobPostBasicDetailsValidator');

class EditJobPostBasicDetailsValidator extends validation {
    constructor (body, local) {
        super(body, local);
        this.body = body;
    }

    async editJobPostBasicDetails () {
        await super.checkId(this.body.id);
        await super.jobPostBasicDetailsValidation();
    }
}

module.exports = EditJobPostBasicDetailsValidator;
