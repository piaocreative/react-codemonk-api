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
    async addTalentToProjectByAdmin () {
        await super.checkId(this.body.talentId);
        this.checkDate(this.body.startDate, 'Start date');
        this.checkDate(this.body.endDate, 'End date');
        await super.checkId(this.body.projectId);
    }
}

module.exports = AddProjectValidator;
