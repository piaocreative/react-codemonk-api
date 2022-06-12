const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const projectDetailsController = require('../../services/v2/projectDetails/projectDetailsController');

router.get('/:id', AuthMiddleWare, ACLMiddleWare, projectDetailsController.details);

module.exports = router;
