const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const ReferralListController = require('../../services/v2/referralList/referralListController');

router.get('/list', AuthMiddleWare, ACLMiddleWare, ReferralListController.list);

module.exports = router;
