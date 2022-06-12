const UploadService = require('../../util/uploadService');
const validation = require('../validation');
/**
 * Class represents validations for user document validation.
 */
class UserDocumentValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate validateUserDocumentUpload
     * @author Innovify
     * @param {file} validateUserDocumentUpload validateUserDocumentUpload
     * @since 09/06/2020
     */

    async validateUserDocumentUpload (file) {
        await this.userDocumentFileType(file.mimetype);
        await this.userDocumentFileSize(file.size);
    }

    /**
     * @desc This function is being used to validate userDocumentFileType
     * @author Innovify
     * @param {file} userDocumentFileType userDocumentFileType
     * @since 09/06/2020
     */
    async userDocumentFileType (mimeType) {
        if (!mimeType || !CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_TYPE.includes(mimeType)) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'JPG, JPEG, PNG and PDF'), 400);
        }
    }

    /**
     * @desc This function is being used to validate fileSize
     * @author Innovify
     * @param {string} fileSize fileSize
     * @since 09/06/2020
     */
    async userDocumentFileSize (fileSize) {
        const { MIN_SIZE, MAX_SIZE } = CONSTANTS.USER_DOCUMENT_FILE;
        if (!fileSize || fileSize < MIN_SIZE || fileSize > MAX_SIZE) {
            throw new CodeMonkError(this.__(this.FILE_SIZE, {
                MIN: UploadService.bytesToSize(MIN_SIZE),
                MAX: UploadService.bytesToSize(MAX_SIZE)
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate validateUserDocumentDelete
     * @author Innovify
     * @since 09/06/2020
     */
    async validateUserDocumentDelete () {
        if (!this.body.document
            || CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_KEYS.indexOf(this.body.document) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'File'), 400);
        }
    }
}

module.exports = UserDocumentValidator;
