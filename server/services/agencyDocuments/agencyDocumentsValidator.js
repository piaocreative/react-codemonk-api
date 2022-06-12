const validation = require('../validation');
const UploadService = require('../../util/uploadService');

/**
 * Class represents validations for agency document validation.
 */
class AgencyDocumentValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate validate Agency Document Upload
     * @author Innovify
     * @param {file} file file
     * @since 01/09/2020
     */

    async validateAgencyDocumentUpload (file) {
        await this.agencyDocumentFileType(file.mimetype);
        await this.agencyDocumentFileSize(file.size);
    }

    /**
     * @desc This function is being used to validate mimeType
     * @author Innovify
     * @param {file} mimeType mimeType
     * @since 01/09/2020
     */
    async agencyDocumentFileType (mimeType) {
        if (!mimeType || !CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_TYPE.includes(mimeType)) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'JPG, JPEG, PNG and PDF'), 400);
        }
    }

    /**
     * @desc This function is being used to validate fileSize
     * @author Innovify
     * @param {string} fileSize fileSize
     * @since 01/09/2020
     */
    async agencyDocumentFileSize (fileSize) {
        const { MIN_SIZE, MAX_SIZE } = CONSTANTS.USER_DOCUMENT_FILE;
        if (!fileSize || fileSize < MIN_SIZE || fileSize > MAX_SIZE) {
            throw new CodeMonkError(this.__(this.FILE_SIZE, {
                MIN: UploadService.bytesToSize(MIN_SIZE),
                MAX: UploadService.bytesToSize(MAX_SIZE)
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate validateAgencyDocumentDelete
     * @author Innovify
     * @since 01/09/2020
     */
    async validateAgencyDocumentDelete () {
        if (!this.body.document
            || CONSTANTS.AGENCY.DOCUMENT_FILE.ALLOWED_KEYS.indexOf(this.body.document) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Document'), 400);
        }
    }
}

module.exports = AgencyDocumentValidator;
