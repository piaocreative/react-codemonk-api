const validation = require('../validation');
/**
 * Class represents validations for client add project details.
 */
class AddProjectValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add project
     * @author Innovify
     * @since 17/09/2020
     */
    async AddProjectByAdmin () {
        await this.checkId(this.body.clientId);
        super.projectName(this.body.name);
        super.projectDescription(this.body.description);
        this.checkDate(this.body.startDate, 'Start date');
        this.checkDate(this.body.endDate, 'End date');
        this.status(this.body.status);
        await this.teamPreference(this.body.teamPreference, 'Team Size');
    }

    /**
     * @desc This function is being used to validate project status
     * @author Innovify
     * @param {Number} status status
     * @since 17/09/2020
     */
    status (status) {
        if (!status || status < 1 || status > 7) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project Status'), 400);
        }
    }
}

module.exports = AddProjectValidator;
