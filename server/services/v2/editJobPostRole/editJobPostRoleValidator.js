const validation = require('../addJobPostRole/addJobPostRoleValidator');

class EditJobPostRoleValidator extends validation {
    constructor (body, local) {
        super(body, local);
        this.body = body;
    }

    async editJobPostRole () {
        await super.checkId(this.body.id);
        await super.jobPostRoleValidation();
    }
}

module.exports = EditJobPostRoleValidator;
