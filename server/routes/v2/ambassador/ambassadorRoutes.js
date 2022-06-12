const router = require('express').Router();
const AuthMiddleWare = require('../../../middleware/auth');
const ACLMiddleWare = require('../../../middleware/acl');
const DashboardController = require('../../../services/v2/ambassador/dashboard/dashboardController');
const ListController = require('../../../services/v2/ambassador/list/listController');
const StatusController = require('../../../services/v2/ambassador/statusChange/statusChangeController');
const DetailsController = require('../../../services/v2/ambassador/details/detailsController');



// Ambassador Routes
router.post('/talent-invite', AuthMiddleWare, ACLMiddleWare, DashboardController.inviteTalents);
router.get('/talent/list', AuthMiddleWare, ACLMiddleWare, DashboardController.getInvitedTalents);
router.post('/client-invite', AuthMiddleWare, ACLMiddleWare, DashboardController.inviteClients);

router.get('/list', AuthMiddleWare, ACLMiddleWare, ListController.list);
router.put('/status', AuthMiddleWare, ACLMiddleWare, StatusController.changeStatus);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, DetailsController.details);
module.exports = router;
