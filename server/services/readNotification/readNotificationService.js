const mongoose = require('mongoose');
const Notification = require('../../models/notification.model');
/**
 * Class represents services for change email address.
 */
class ReadNotificationService {
    /**
     * @desc This function is being used to change email address
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp to confirm
     * @param {object} user Logged in client user data
     */
    static async readNotification (req, user) {
        let condition = { userId:  mongoose.Types.ObjectId(user.userId) };
        if (req.body.id) {
            condition = { _id:  mongoose.Types.ObjectId(req.body.id) };
        }
        await Notification.updateOne(
            condition, {
                $set: {
                    isRead: 1
                }
            });
    }
}

module.exports = ReadNotificationService;
