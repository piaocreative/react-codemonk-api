const CodeMonkError = require('../../../util/CodeMonkError');
const validation = require('../../validation');
const {
    ROLE: { ADMIN } } = require('../../../util/constants');

/**
 * Class represents validations for updating talent profile
 */
class VerifyTalentProfileValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     *
     * @param {string} currentStatus
     * @param {string} role
     */
    checkStatusUpdate (currentStatus, role) {
        if (role === ADMIN) {
            if ((this.body.verifiedProfile === 'true') || (this.body.verifiedProfile === true)) {
                if (currentStatus) {
                    throw new CodeMonkError(this.__(this.NOT_VALID, 'Profile Status'), 400);
                }
            } else if (!currentStatus) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Profile Status'), 400);
            }
        }
        return this.body.verifiedProfile;
    }
}

module.exports = VerifyTalentProfileValidator;
