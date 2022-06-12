const validation = require('../validation');

/**
 * Class represents validations for agency agency certificate and credetials validation.
 */
class AgencyCredentialsEditValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate credentials urls
     * @author Innovify
     * @since 02/09/2020
     */
    validateCredentialsUrl () {
        super.linkedInUrl(this.body.linkedInUrl);
        super.gitHubUrl(this.body.gitHubUrl);
        super.dribbbleUrl(this.body.dribbbleUrl);
        super.clutchUrl(this.body.clutchUrl);
        super.goodfirmsUrl(this.body.goodfirmsUrl);
        super.otherWebsiteUrl(this.body.otherWebsiteUrl);
    }
}

module.exports = AgencyCredentialsEditValidator;
