const UploadService = require('../../../util/uploadService');
const validation = require('../../validation');
const sizeOf = require('buffer-image-size');


/**
 * Class represents validations for user Basic Profile.
 */
class AddCompanyValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate user profile picture
     * @author Innovify
     * @since 04/06/2020
     */
    async validateLogo () {
        if (typeof this.body === 'undefined') {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'File'), 400);
        }
        await this.fileType(this.body.mimetype);
        await this.fileSize(this.body.size);
        await this.fileResoultion(this.body.buffer);


    }

    /**
     * @desc This function is being used to validate user profile picture fileType
     * @author Innovify
     * @since 04/06/2020
     * @param {String} mimeType mimeType
     */
    async fileType (mimeType) {
        if (!mimeType || !CONSTANTS.PROFILE_PICTURE.ALLOWED_TYPE.includes(mimeType)) {
            throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'PNG, JPG and JPEG'), 400);
        }
    }

    /**
     * @desc This function is being used to validate user profile picture file size in bytes
     * @author Innovify
     * @since 04/06/2020
     * @param {Number} fileSize fileSize
     */
    async fileSize (fileSize) {
        const { MIN_SIZE, MAX_SIZE } = CONSTANTS.PROFILE_PICTURE;
        if (!fileSize || fileSize < MIN_SIZE || fileSize > MAX_SIZE) {
            throw new CodeMonkError(this.__('FILE_SIZE', {
                MIN: UploadService.bytesToSize(MIN_SIZE),
                MAX: UploadService.bytesToSize(MAX_SIZE)
            }), 400);
        }
    }

    async fileResoultion (buffer) {

        const dimensions = sizeOf(buffer);

        const { WIDTH, HEIGHT } = CONSTANTS.COMPANY_LOGO.RESOLUTION;
        if (!dimensions || dimensions.width < WIDTH || dimensions.height < HEIGHT) {
            throw new CodeMonkError(this.__('FILE_RESOLUTION', {
                MIN: WIDTH,
                MAX: HEIGHT
            }), 400);
        }
    }
}

module.exports = AddCompanyValidator;
