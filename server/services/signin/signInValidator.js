const validation = require('../validation');

/**
 * Class represents validations for signin.
 */
class SignInValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for sign in
     * @author Innovify
     * @since 07/01/2020
     */
    async validate () {
        await this.email(this.body.email);
        await this.password(this.body.password);
    }
}

module.exports = SignInValidator;
