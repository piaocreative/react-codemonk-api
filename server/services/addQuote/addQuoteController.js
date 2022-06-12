const AddQuoteService = require('./addQuoteService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin add quote details.
 */
class AddQuoteController {

    /**
     * @desc This function is being used to add quote details
     * @author Innovify
     * @since 05/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addQuote (req, res) {
        try {
            const data = await AddQuoteService.addQuote(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddQuoteController;
