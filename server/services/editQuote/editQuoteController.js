const EditQuoteService = require('./editQuoteService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin edit quote details.
 */
class EditQuoteController {

    /**
     * @desc This function is being used to edit quote details
     * @author Innovify
     * @since 05/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async editQuote (req, res) {
        try {
            const data = await EditQuoteService.editQuote(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
    /**
     * @desc This function is being used to archive quote
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async archiveQuote (req, res) {
        await EditQuoteService.archiveQuote(req, res.locals.user, res.__);
        Utils.sendResponse(null, null, res, res.__('QUOTE_ARCHIVE_SUCCESS'));
    }
}

module.exports = EditQuoteController;
