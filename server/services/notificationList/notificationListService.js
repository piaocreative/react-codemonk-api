const Notification = require('../../models/notification.model');
const Utils = require('../../util/utilFunctions');
const mongoose = require('mongoose');
const User = require('../../models/user.model');
/**
 * Class represents services for notification list based on status
 */
class NotificationListService {
    /**
     * @desc This function is being used to get notification based on status
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list (req, user) {
        const options = {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };
        const aggregateParams = [];
        aggregateParams.push({
            $match: {
                userId: mongoose.Types.ObjectId(user.userId)
            }
        });
        aggregateParams.push({
            $project: {
                _id: 1,
                userId: 1,
                isRead: 1,
                createdAt: 1,
                metaData: 1,
                notificationType: 1,
                message: 1,
                companyName: 1
            }
        });
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            notificationLastVisited: MOMENT()
        });

        const aggregate = Notification.aggregate([aggregateParams]);
        return await Notification.aggregatePaginate(aggregate, options);
    }
}

module.exports = NotificationListService;
