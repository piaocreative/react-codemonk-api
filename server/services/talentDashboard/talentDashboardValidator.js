const validation = require('../validation');
/**
 * Class represents validations for Talent Project Details.
 */
class TalentProjectDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate project Details
     * @author Innovify
     * @since 10/06/2020
     */
    async validationInviteEmails (emails) {
        if (!emails || !Array.isArray(emails) || !emails.length) {
            throw new CodeMonkError(this.__(this.SELECT, 'Email'), 400);
        }

        await this.inviteCheck(emails);
    }

    async inviteCheck (emails) {
        for (const emailObj of emails) {
            await this.email(emailObj.email);
        }
    }

}

module.exports = TalentProjectDetailsValidator;
