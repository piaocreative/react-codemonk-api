const validation = require('../addJobPostEngagement/addJobPostEngagementValidator');

class EditJobPostEngagementValidator extends validation {
    constructor (body, local) {
        super(body, local);
        this.body = body;
    }

    async editJobPostEngagement () {
        await super.checkId(this.body.id);
        await super.jobPostEngagementValidation();
    }
}

module.exports = EditJobPostEngagementValidator;
