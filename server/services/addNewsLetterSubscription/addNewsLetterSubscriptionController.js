
const AddSubscribeNewsLetterService = require('./addNewsLetterSubscriptionService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client new letter subscription
 */
class AddSubscribeNewsLetterController {

    /**
     * @desc This function is being used to client new letter subscription
     * @author Innovify
     * @since 14/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async subscribeNewsLetter (req, res) {
        const data = await AddSubscribeNewsLetterService.subscribeNewsLetter(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('NEWSLETTER_SUCCESS'));
    }
}

module.exports = AddSubscribeNewsLetterController;
