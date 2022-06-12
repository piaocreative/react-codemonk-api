const validation = require('../validation');
/**
 * Class represents validations for change client validation
 */
class ClientStatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add Client
     * @author Innovify
     * @since 13/11/2020
     */
    async ClientStatusChange () {
        await super.checkId(this.body.clientId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate client status
     * @author Innovify
     * @param {Number} status status
     * @since 13/11/2020
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 1 || status > 2) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
        }
    }
}

module.exports = ClientStatusChangeValidator;
