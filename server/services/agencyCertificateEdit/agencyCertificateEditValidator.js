const validation = require('../validation');

/**
 * Class represents validations for agency agency certificate and credetials validation.
 */
class AgencyPayDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate agency certificates
     * @author Innovify
     * @since 06/10/2020
     */
    async validateCertificateDetails () {
        if (this.body.certificates
            && this.body.certificates.length
            && Array.isArray(this.body.certificates)) {
            await super.certificateDetails(this.body.certificates, true);
        }
    }
}

module.exports = AgencyPayDetailsValidator;
