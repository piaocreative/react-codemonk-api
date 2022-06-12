const validation = require('../validation');
/**
 * Class represents validations for client add quote details.
 */
class AddQuoteValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add quote
     * @author Innovify
     * @since 05/11/2020
     */
    async addQuote () {
        await super.checkId(this.body.projectId);
        super.quoteTitle(this.body.name);
        super.quoteDescription(this.body.description);
    }
}

module.exports = AddQuoteValidator;
