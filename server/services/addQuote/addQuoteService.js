const mongoose = require('mongoose');
const Quote = require('../../models/quote.model');
const AddQuoteValidator = require('./addQuoteValidator');
const UploadService = require('../../util/uploadService');
const VisitHistory = require('../../models/visitHistory.model');
const SendNotification = require('../../util/sendNotification');

/**
 * Class represents services for admin add quote details.
 */
class AddQuoteService {

    /**
     * @desc This function is being used to add admin quote details
     * @author Innovify
     * @since 05/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async addQuote (req, user, local) {
        const Validator = new AddQuoteValidator(req.body, local);
        await Validator.addQuote();
        Validator.checkQuoteFileSize(req.file.size);
        const path = `${process.env.NODE_ENV}-quotes/${user._id}/${req.file.originalname}`;
        const quoteUrl = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${path}`;
        await UploadService.uploadFileFromFile(req.file, path);
        const projectId = mongoose.Types.ObjectId(req.body.projectId);
        const quote = {
            projectId,
            name: req.body.name,
            description: req.body.description,
            status: 1,
            addedBy: user._id,
            quoteUrl
        };
        const result = await Quote.create(quote);
        await VisitHistory.updateOne({}, {
            quoteId: result,
            quotePublishedDate: MOMENT()
        }, {
            upsert: true
        });
        req.body.quoteId = result._id;
        req.body.projectId = result.projectId;
        req.body.notificationType = CONSTANTS.NOTIFICATION_TYPE.NEW_QUOTE;
        await SendNotification.sendNotification(req, user, local);
    }
}

module.exports = AddQuoteService;
