const validation = require('../validation');
/**
 * Class represents validations for change email address request.
 */
class UserEmailChangeValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }
}

module.exports = UserEmailChangeValidator;
