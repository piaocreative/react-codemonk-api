
const NotificationListService = require('./notificationListService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for notification list based on status
 */
class NotificationListController {

    /**
     * @desc This function is being used to get notification list based on status
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, res) {
        const data = await NotificationListService.list(req, res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = NotificationListController;
