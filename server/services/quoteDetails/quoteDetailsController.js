
const QouteDetailsService = require('./quoteDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for quote details based on it's id
 */
class QouteDetailsController {

    /**
     * @desc This function is being used to get quote details based on it's id
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await QouteDetailsService.details(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = QouteDetailsController;
