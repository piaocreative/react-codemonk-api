const router = require('express').Router();
const SendJobPostNotificationController = require('../../services/sendJobPostNotification/sendJobPostNotificationController');


router.post('/job-post/send', SendJobPostNotificationController.sendNotification);

module.exports = router;
