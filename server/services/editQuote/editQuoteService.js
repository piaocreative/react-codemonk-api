const mongoose = require('mongoose');
const Quote = require('../../models/quote.model');
const EditQuoteValidator = require('./editQuoteValidator');
const UploadService = require('../../util/uploadService');

/**
 * Class represents services for admin edit quote details.
 */
class EditQuoteService {

    /**
     * @desc This function is being used to edit admin quote details
     * @author Innovify
     * @since 05/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async editQuote (req, user, local) {
        const Validator = new EditQuoteValidator(req.body, local);
        await Validator.editQuote();

        const quote = {
            name: req.body.name,
            description: req.body.description
        };

        if (req.file) {
            Validator.checkQuoteFileSize(req.file.size);
            const path = `${process.env.NODE_ENV}-quotes/${user._id}/${req.file.originalname}`;
            quote.quoteUrl = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${path}`;
            await UploadService.uploadFileFromFile(req.file, path);
        }

        await Quote.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: quote
        });
    }
    /**
     * @desc This function is being used to archive job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async archiveQuote (req) {
        const condition = {
            _id: mongoose.Types.ObjectId(req.params.id)
        };
        await Quote.updateOne(condition, {
            $set: { isArchived: true }
        });
    }
}

module.exports = EditQuoteService;
