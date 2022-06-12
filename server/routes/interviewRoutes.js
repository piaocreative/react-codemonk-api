const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const InterviewListController = require('../services/interviewDetails/interviewDetailsController');

// Admin Routes
router.get('/:id', AuthMiddleWare, ACLMiddleWare, InterviewListController.details);

module.exports = router;
