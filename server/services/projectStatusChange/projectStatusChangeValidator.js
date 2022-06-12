const validation = require('../validation');
/**
 * Class represents validations for change project validation
 */
class ProjectStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add project
     * @author Innovify
     * @since 21/09/2020
     */
    async projectStatusChange () {
        await this.checkId(this.body.projectId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate project status
     * @author Innovify
     * @param {Number} status status
     * @since 21/09/2020
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 0 || status > 7) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project Status'), 400);
        }
    }
}

module.exports = ProjectStatusChangeValidator;
