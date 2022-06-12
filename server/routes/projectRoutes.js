const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const addProjectController = require('../services/addProject/addProjectController');
const projectListController = require('../services/projectList/projectListController');
const addProjectByAdminController = require('../services/addProjectByAdmin/addProjectByAdminController');
const addTalentToProjectByAdminController = require('../services/addTalentToProjectByAdmin/addTalentToProjectByAdminController');
const projectDetailsController = require('../services/projectDetails/projectDetailsController');
const projectStatuChangeController = require('../services/projectStatusChange/projectStatusChangeController');
const talentStatusChangeForProjectController = require('../services/talentStatusChangeForProject/talentStatusChangeForProjectController');
const editProjectController = require('../services/editProject/editProjectController');

router.post('/', AuthMiddleWare, ACLMiddleWare, addProjectController.addProject);
router.get('/list', AuthMiddleWare, ACLMiddleWare, projectListController.list);
router.post('/admin', AuthMiddleWare, ACLMiddleWare, addProjectByAdminController.addProjectByAdmin);
router.put('/talent', AuthMiddleWare, ACLMiddleWare, addTalentToProjectByAdminController.addTalentToProjectByAdmin);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, projectDetailsController.details);
router.put('/status', AuthMiddleWare, ACLMiddleWare, projectStatuChangeController.changeStatus);
router.put('/talent/status', AuthMiddleWare, ACLMiddleWare, talentStatusChangeForProjectController.changeTalentStatus);
router.put('/', AuthMiddleWare, ACLMiddleWare, editProjectController.editProject);

module.exports = router;
