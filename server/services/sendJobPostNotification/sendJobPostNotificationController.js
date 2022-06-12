
const sendJobPostNotificationService = require('./sendJobPostNotificationService');
const Utils = require('../../util/utilFunctions');

class sendJobPostNotificationController {

    static async sendNotification (req, res) {
        try {
            const data = await sendJobPostNotificationService.sendNotification(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = sendJobPostNotificationController;
