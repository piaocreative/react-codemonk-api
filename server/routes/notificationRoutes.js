/**
 * This file is used to signin API's routes.
 * Created by Innovify on 19/04/2018.
 * @name authRoutes
 */
const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const AddNotificationController = require('../services/addNotification/addNotificationController');
const NotificationListController = require('../services/notificationList/notificationListController');
const ReadNotificationController = require('../services/readNotification/readNotificationController');


// Notification Routes
router.post('/', AuthMiddleWare, ACLMiddleWare, AddNotificationController.addNotification);
router.put('/mark-read', AuthMiddleWare, ACLMiddleWare, ReadNotificationController.readNotification);
router.get('/list', AuthMiddleWare, ACLMiddleWare, NotificationListController.list);


module.exports = router;
