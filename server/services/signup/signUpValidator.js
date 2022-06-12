const validation = require('../validation');
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

    /**
     * @desc This function is being used to validate OTP request
     * @author Innovify
     * @since 27/05/2020
     */
    async otpValidate () {
        await this.email(this.body.email);
        await this.otp(this.body.otp);
    }

    /**
     * @desc This function is being used to validate agency talent signUp
     * @author Innovify
     * @since 08/09/2020
     */
    async validateTalentSignup () {
        await this.email(this.body.email);
        await this.password(this.body.password);
        await this.checkId(this.body.token);
    }

}

module.exports = SignUpValidator;
