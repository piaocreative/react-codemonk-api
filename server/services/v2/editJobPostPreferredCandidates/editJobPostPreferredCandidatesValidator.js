const validation = require('../addJobPostPreferredCandidates/addJobPostPreferredCandidatesValidator');

class EditJobPostPreferredCandidatesValidator extends validation {
    constructor (body, local) {
        super(body, local);
        this.body = body;
    }

    async editJobPostPreferredCandidates () {
        await super.checkId(this.body.id);
        await super.jobPostPreferredCandidatesValidation();
    }
}

module.exports = EditJobPostPreferredCandidatesValidator;
