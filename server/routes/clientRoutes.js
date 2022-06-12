const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const ClientProfileController = require('../services/clientProfile/clientProfileController');
const ClientListController = require('../services/clientList/clientListController');
const ClientSearchByNameController = require('../services/clientSearchByName/clientSearchByNameController');
const ClientAddInterviewScheduleController = require('../services/clientAddInterviewSchedule/clientAddInterviewScheduleController');
const ClientProjectSearchByName = require('../services/clientProjectSearchByName/clientProjectSearchByNameController');
const ClientProjectListController = require('../services/clientProjectList/clientProjectListController');
const ClientInterviewListController = require('../services/clientInterviewList/clientInterviewListController');
const ClientTalentListController = require('../services/clientTalentList/clientTalentListController');
const ClientNewsLetterController = require('../services/addNewsLetterSubscription/addNewsLetterSubscriptionController');
const ClientProjectCountController = require('../services/clientProjectsCount/clientProjectsCountController');
const ClientTalentsCountController = require('../services/clientTalentsCount/clientTalentsCountController');
const ClientTalentsTeamController = require('../services/clientTalentsRoleWiseCount/clientTalentsRoleWiseCountController');
const ClientStatusController = require('../services/clientStatusChange/clientStatusChangeController');
const ClientDetailsController = require('../services/clientDetails/clientDetailsController');

// Client Routes
router.put('/phone-number', AuthMiddleWare, ACLMiddleWare, ClientProfileController.saveClientPhoneNumber);
router.put('/verify-phone-number', AuthMiddleWare, ACLMiddleWare, ClientProfileController.verifyClientPhoneNumber);

router.put('/profile', AuthMiddleWare, ACLMiddleWare, ClientProfileController.updateClientProfile);

router.put('/about-you', AuthMiddleWare, ACLMiddleWare, ClientProfileController.updateClientAboutYou);
router.put('/about-company', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), ClientProfileController.updateClientAboutCompany);
router.post('/company-location', AuthMiddleWare, ACLMiddleWare, ClientProfileController.updateClientCompanyLocation);
router.put('/company-location', AuthMiddleWare, ACLMiddleWare, ClientProfileController.updateClientCompanyLocationEdit);
router.delete('/company-location', AuthMiddleWare, ACLMiddleWare, ClientProfileController.deleteClientCompanyLocation);

router.put('/save-later', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), ClientProfileController.updateClientProfileSaveLater);
router.get('/list', AuthMiddleWare, ACLMiddleWare, ClientListController.list);
router.get('/by-name', AuthMiddleWare, ACLMiddleWare, ClientSearchByNameController.searchByName);

router.post('/interview', AuthMiddleWare, ACLMiddleWare, ClientAddInterviewScheduleController.addInterviewSchedule);
router.get('/project/list', AuthMiddleWare, ACLMiddleWare, ClientProjectSearchByName.clientProjectSearchByName);
router.get('/projects', AuthMiddleWare, ACLMiddleWare, ClientProjectListController.clientProjects);
router.get('/interviews', AuthMiddleWare, ACLMiddleWare, ClientInterviewListController.list);
router.get('/talents', AuthMiddleWare, ACLMiddleWare, ClientTalentListController.clientTalents);
router.post('/news-letter', AuthMiddleWare, ACLMiddleWare, ClientNewsLetterController.subscribeNewsLetter);
router.get('/projects/count', AuthMiddleWare, ACLMiddleWare, ClientProjectCountController.count);
router.get('/project/talents/count', AuthMiddleWare, ACLMiddleWare, ClientTalentsCountController.count);
router.get('/project/team/count', AuthMiddleWare, ACLMiddleWare, ClientTalentsTeamController.count);
router.put('/status', AuthMiddleWare, ACLMiddleWare, ClientStatusController.changeStatus);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, ClientDetailsController.details);

module.exports = router;
