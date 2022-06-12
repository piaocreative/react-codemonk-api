const SubmitQuoteService = require('./submitQuoteService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin submit a quote by admin.
 */
class SubmitQuoteController {

    /**
     * @desc This function is being used to submit a quote by agency
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async submitQuote (req, res) {
        try {
            const data = await SubmitQuoteService.submitQuote(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = SubmitQuoteController;
