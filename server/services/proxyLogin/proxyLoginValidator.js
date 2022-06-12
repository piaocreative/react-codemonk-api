const validation = require('../validation');

/**
 * Class represents validations for proxy login.
 */
class proxyLoginValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for proxy login
     * @author Innovify
     * @since 07/12/2020
     */
    async validate () {
        await this.checkId(this.body.userId);
    }
}

module.exports = proxyLoginValidator;
