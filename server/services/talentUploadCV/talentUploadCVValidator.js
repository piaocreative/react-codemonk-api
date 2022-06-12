const validation = require('../validation');

/**
 * Class represents validations for talent upload CV.
 */
class TalentUploadCVValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate valid cv upload file
     * @author Innovify
     * @param {File} talentCV talentCV
     * @since 23/11/2020
     */

    async validateUploadCVFile (file) {
        if (file) {
            await this.uploadTalentsFileType(file.mimetype);
        } else {
            throw new CodeMonkError(this.__(this.REQUIRED, 'File'), 400);
        }
    }

    /**
     * @desc This function is being used to validate uploaded CV mimetype
     * @author Innovify
     * @param {String} mimeType mimeType
     * @since 23/11/2020
     */
    async uploadTalentsFileType (mimeType) {
        if (!mimeType || !CONSTANTS.TALENT_UPLOAD_CV_FILE.ALLOWED_TYPE.includes(mimeType) ) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'PDF, Word, DOC, and TEXT' ), 400);
        }
    }

}

module.exports = TalentUploadCVValidator;
