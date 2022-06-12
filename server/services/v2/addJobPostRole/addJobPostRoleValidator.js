const validation = require('../../validation');
/**
 * Class represents validations for client add job post role.
 */
class AddJobPostRoleValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add job post
     * @author CodeMonk
     * @since 07/01/2022
     */
    async addJobPostRole () {
        this.projectName(this.body.projectName);
        await this.jobPostRoleValidation();
    }

    async jobPostRoleValidation () {
        this.briefTitle(this.body.name);
        this.primaryRole(this.body.role);
        this.expertise(this.body.expertise);
        this.briefDescription(this.body.description);
        await this.teamPreference(this.body.teamPreference);
    }
}

module.exports = AddJobPostRoleValidator;
