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
     * @desc This function is used to validate request for ambassador signUp
     * @author CodeMonk
     * @since 07/01/2020
     */
    async validate () {
        await this.email(this.body.email);
        await this.password(this.body.password);
    }
}

module.exports = SignUpValidator;
