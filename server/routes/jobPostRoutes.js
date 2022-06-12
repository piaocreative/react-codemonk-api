const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const InactiveUserMiddleWare = require('../middleware/inactiveUser');

const JobPostListController = require('../services/jobPostList/jobPostListController');
const JobPostDetailsController = require('../services/jobPostDetails/jobPostDetailsController');
const JobPostApplyController = require('../services/jobPostApply/jobPostApplyController');
const JobPostAddController = require('../services/addJobPost/addJobPostController');
const JobPostEditController = require('../services/editJobPost/editJobPostController');

const FeatureJobPostsController = require('../services/featureJobPosts/featureJobPostsController');
const AddJobPostBasicDetailsController = require('../services/addJobPostBasicDetails/addJobPostBasicDetailsController');
const AddJobPostPreferredCandidatesController = require('../services/addJobPostPreferredCandidates/addJobPostPreferredCandidatesController');
const EditJobPostBasicDetailsController = require('../services/editJobPostBasicDetails/editJobPostBasicDetailsController');
const EditJobPostPreferredCandidatesController = require('../services/editJobPostPreferredCandidates/editJobPostPreferredCandidatesController');

router.get('/feature', FeatureJobPostsController.featureJobs);
router.get('/list', AuthMiddleWare, ACLMiddleWare, JobPostListController.list);
router.post('/apply', AuthMiddleWare, ACLMiddleWare, InactiveUserMiddleWare, JobPostApplyController.apply);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, JobPostDetailsController.details);
router.patch('/archive/:id', AuthMiddleWare, ACLMiddleWare, JobPostEditController.archiveJobPost);

router.post('/', AuthMiddleWare, ACLMiddleWare, JobPostAddController.addJobPost);
router.put('/', AuthMiddleWare, ACLMiddleWare, JobPostEditController.editJobPost);
router.post('/basic-details', AuthMiddleWare, ACLMiddleWare, AddJobPostBasicDetailsController.addJobPostBasicDetails);
router.post('/preferred-candidates', AuthMiddleWare, ACLMiddleWare, AddJobPostPreferredCandidatesController.addJobPostPreferredCandidates);
router.put('/basic-details', AuthMiddleWare, ACLMiddleWare, EditJobPostBasicDetailsController.editJobPostBasicDetails);
router.put('/preferred-candidates', AuthMiddleWare, ACLMiddleWare, EditJobPostPreferredCandidatesController.editJobPostPreferredCandidates);



module.exports = router;
