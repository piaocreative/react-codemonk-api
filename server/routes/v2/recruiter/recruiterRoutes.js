const router = require('express').Router();
const AuthMiddleWare = require('../../../middleware/auth');
const ACLMiddleWare = require('../../../middleware/acl');
const UploadMiddleWare = require('../../../middleware/upload');
const RecruiterListController = require('../../../services/v2/recruiter/recruiterList/recruiterListController');
const RecruiterStatusController = require('../../../services/v2/recruiter/recruiterStatusChange/recruiterStatusChangeController');
const RecruiterDetailsController = require('../../../services/v2/recruiter/recruiterDetails/recruiterDetailsController');
const RecruiterProfileController = require('../../../services/v2/recruiter/recruiterProfile/recruiterProfileController');
const RecruiterDashboardController = require('../../../services/v2/recruiter/recruiterDashboard/recruiterDashboardController');

// Recruiter Routes
router.get('/list', AuthMiddleWare, ACLMiddleWare, RecruiterListController.list);
router.put('/status', AuthMiddleWare, ACLMiddleWare, RecruiterStatusController.changeStatus);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, RecruiterDetailsController.details);
router.put('/about-you', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), RecruiterProfileController.updateRecruiterAboutYou);
router.put('/about-company', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), RecruiterProfileController.updateRecruiterAboutCompany);
router.put('/save-later', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), RecruiterProfileController.updateRecruiterProfileSaveLater);
router.post('/talent-invite', AuthMiddleWare, ACLMiddleWare, RecruiterDashboardController.inviteTalents);
router.get('/talent/list', AuthMiddleWare, ACLMiddleWare, RecruiterDashboardController.getInvitedTalents);

module.exports = router;
