const router = require('express').Router();
const AuthMiddleWare = require('../../../middleware/auth');
const ACLMiddleWare = require('../../../middleware/acl');
const JobPostListController = require('../../../services/v2/recruiter/jobPostList/jobPostListController');
const JobPostDetailsController = require('../../../services/v2/recruiter/jobPostDetails/jobPostDetailsController');


router.get('/list', AuthMiddleWare, ACLMiddleWare, JobPostListController.list);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, JobPostDetailsController.details);

module.exports = router;
