const validation = require('../validation');
/**
 * Class represents validations for change agency validation
 */
class AgencyStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add Agency
     * @author Innovify
     * @since 13/11/2020
     */
    async AgencyStatusChange () {
        await super.checkId(this.body.agencyId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate agency status
     * @author Innovify
     * @param {Number} status status
     * @since 07/12/2020
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 1 || status > 2) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
        }
    }
}

module.exports = AgencyStatusChangeValidator;
