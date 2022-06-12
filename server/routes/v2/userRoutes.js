const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const UserProfileController = require('../../services/v2/userProfile/userProfileController');

router.use('/details', AuthMiddleWare, ACLMiddleWare, UserProfileController);



module.exports = router;
