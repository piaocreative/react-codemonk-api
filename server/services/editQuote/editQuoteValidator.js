const validation = require('../validation');
/**
 * Class represents validations for client Edit quote details.
 */
class EditQuoteValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate edit quote
     * @author Innovify
     * @since 05/11/2020
     */
    async editQuote () {
        await super.checkId(this.body.id);
        super.quoteTitle(this.body.name);
        super.quoteDescription(this.body.description);
    }
}

module.exports = EditQuoteValidator;
