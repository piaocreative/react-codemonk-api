const CodeMonkError = require('../../../util/CodeMonkError');
const validation = require('../../validation');

/**
 * Class represents validations for downloading the talent document
 */
class DownloadTalentDocsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate validateUserDocument
     * @author CodeMonk
     * @since 02/02/2022
     */
    async validateUserDocument (type) {
        if (!type
            || CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_KEYS.indexOf(type) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Type'), 400);
        }
    }
}


module.exports = DownloadTalentDocsValidator;
