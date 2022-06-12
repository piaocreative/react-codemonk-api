const validation = require('../validation');
const moment = require('moment');
/**
 * Class represents validations for client edit project details.
 */
class EditProjectValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate edit project
     * @author Innovify
     * @since 05/08/2020
     */
    async editProject () {
        await super.checkId(this.body.projectId);
        super.projectName(this.body.name);
        super.projectDescription(this.body.description);
    }

    /**
     * @desc This function is being used to validate date in DD/MM/YYYY format
     * @author Innovify
     * @since 16/06/2020
     * @param {String} date date
     */
    checkDate (date) {
        if (date) {
            const dobDate = moment(date, 'DD/MM/YYYY');
            if (dobDate.isValid()) {
                return dobDate;
            }
        }
    }

    /**
     * @desc This function is being used to validate project status
     * @author Codemonk
     * @param {Number} status status
     * @since 07/05/2021
     */
    status (status) {
        if (status && (status < 0 || status > 7)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project Status'), 400);
        }
    }
}

module.exports = EditProjectValidator;
