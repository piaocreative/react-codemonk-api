
const ReadNotificationService = require('./readNotificationService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for change email address.
 */
class ReadNotificationController {

    /**
     * @desc This function is being used to change email address
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp for confirm
     */
    static async readNotification (req, res) {
        try {
            const data = await ReadNotificationService.readNotification(req, res.locals.user);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ReadNotificationController;
