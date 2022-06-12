const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const AdminInterviewListController = require('../services/adminInterviewList/adminInterviewListController');
const AdminInterviewChangeStatusController = require('../services/adminInterviewChangeStatus/adminInterviewChangeStatusController');
const AdminInterviewChangeTalentStatusController =
  require('../services/adminInterviewChangeTalentStatus/adminInterviewChangeTalentStatusController');
const ProxyLoginController = require('../services/proxyLogin/proxyLoginController.js');
const DashboardController = require('../services/dashboard/dashboard.controller');
// Admin Proxy Login


router.post('/proxy-login', AuthMiddleWare, ACLMiddleWare, ProxyLoginController.proxyLogin);
router.get('/interviews', AuthMiddleWare, ACLMiddleWare, AdminInterviewListController.list);
router.put('/interview/status', AuthMiddleWare, ACLMiddleWare, AdminInterviewChangeStatusController.status);
router.put('/interview/talent/status', AuthMiddleWare, ACLMiddleWare, AdminInterviewChangeTalentStatusController.talentStatus);
router.get('/kpis', AuthMiddleWare, ACLMiddleWare, DashboardController.adminKPIs);

module.exports = router;
