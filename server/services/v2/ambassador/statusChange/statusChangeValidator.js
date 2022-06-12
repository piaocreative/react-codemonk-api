const validation = require('../../../validation');
/**
 * Class represents validations for change ambassador validation
 */
class StatusChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add ambassador
     * @author CodeMonk
     * @since 03/01/2022
     */
    async ambassadorStatusChange () {
        await super.checkId(this.body.ambassadorId);
        this.status(this.body.status);
    }

    /**
     * @desc This function is being used to validate ambassador status
     * @author CodeMonk
     * @param {Number} status status
     * @since 03/01/2022
     */
    status (status) {
        if (status === undefined || isNaN(status) || status < 1 || status > 2) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
        }
    }
}

module.exports = StatusChangeValidator;
