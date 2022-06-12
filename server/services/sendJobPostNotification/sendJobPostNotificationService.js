const BotService = require('../../util/sendJobPostNotification');

class sendJobPostNotificationService {

    static async sendNotification (req, user, local) {
        if (req.body && req.body.send) {
            const response = await BotService.sendMessage(req.body.title, req.body.description, req.body.url);
            return response.body; 
        } else {
            return 'Skipped !!!';
        }
    }
}

module.exports = sendJobPostNotificationService;
