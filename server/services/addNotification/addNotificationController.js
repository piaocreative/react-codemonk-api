
const AddNotificationService = require('./addNotificationService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client add project details.
 */
class AddNotificationController {

    /**
     * @desc This function is being used to add client project details
     * @author Innovify
     * @since 05/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addNotification (req, res) {
        try {
            const data = await AddNotificationService.addNotification(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddNotificationController;
