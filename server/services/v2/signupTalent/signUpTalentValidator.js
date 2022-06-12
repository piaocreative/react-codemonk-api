const validation = require('../../validation');
/**
 * Class represents validations for signup.
 */
class SignUpValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for talent signUp
     * @author Innovify
     * @since 07/01/2020
     */
    async validate () {
        await this.email(this.body.email);
        await this.password(this.body.password);
    }
}

module.exports = SignUpValidator;
