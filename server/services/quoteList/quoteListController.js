
const QuoteListService = require('./quoteListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent quote list based on status
 */
class QuoteListController {

    /**
     * @desc This function is being used to get talent quote list based on status
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await QuoteListService.list(req, res.locals.user, res.newQuote);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = QuoteListController;
