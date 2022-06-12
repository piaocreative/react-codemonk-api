const AddNotificationService = require('../services/addNotification/addNotificationService');
class SendNotification {
    static async sendNotification (req, user, local) {
        await AddNotificationService.addNotification(req, user, local);
    }
}
module.exports = SendNotification;
