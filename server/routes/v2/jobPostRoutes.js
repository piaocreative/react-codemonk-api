const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const InactiveUserMiddleWare = require('../../middleware/inactiveUser');

const JobPostApplyController = require('../../services/v2/jobPostApply/jobPostApplyController');
const AddJobPostRoleController = require('../../services/v2/addJobPostRole/addJobPostRoleController');
const AddJobPostPreferredCandidatesController =
require('../../services/v2/addJobPostPreferredCandidates/addJobPostPreferredCandidatesController');
const AddJobPostEngagementController = require('../../services/v2/addJobPostEngagement/addJobPostEngagementController');

const EditJobPostRoleController = require('../../services/v2/editJobPostRole/editJobPostRoleController');
const EditJobPostPreferredCandidatesController =
require('../../services/v2/editJobPostPreferredCandidates/editJobPostPreferredCandidatesController');
const EditJobPostEngagementController = require('../../services/v2/editJobPostEngagement/editJobPostEngagementController');
const TalentStatusChangeController = require('../../services/v2/jobPost/talentStatusChange/talentStatusChangeController');
const TalentStatusAddController = require('../../services/v2/jobPost/talentStatusAdd/talentStatusAddController');
const JobPostController = require('../../services/v2/jobPostManagement/jobPostController');

router.post('/', AuthMiddleWare, ACLMiddleWare, JobPostController.addJobPost);
router.put('/', AuthMiddleWare, ACLMiddleWare, JobPostController.updateJobPostRole);
router.post('/apply', AuthMiddleWare, ACLMiddleWare, InactiveUserMiddleWare, JobPostApplyController.apply);
router.post('/role', AuthMiddleWare, ACLMiddleWare, AddJobPostRoleController.addJobPostRole);
router.post('/preferred-candidates', AuthMiddleWare, ACLMiddleWare, AddJobPostPreferredCandidatesController.addJobPostPreferredCandidates);
router.post('/engagement', AuthMiddleWare, ACLMiddleWare, AddJobPostEngagementController.addJobPostEngagement);
router.put('/role', AuthMiddleWare, ACLMiddleWare, EditJobPostRoleController.editJobPostRole);
router.put('/preferred-candidates', AuthMiddleWare, ACLMiddleWare, EditJobPostPreferredCandidatesController.editJobPostPreferredCandidates);
router.put('/engagement', AuthMiddleWare, ACLMiddleWare, EditJobPostEngagementController.editJobPostEngagement);
router.put('/talent/status', AuthMiddleWare, ACLMiddleWare, TalentStatusChangeController.changeTalentStatus);
router.post('/talent/status', AuthMiddleWare, ACLMiddleWare, TalentStatusAddController.addTalentStatus);

module.exports = router;
