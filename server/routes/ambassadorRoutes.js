const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const AmbassadorProfileController = require('../services/ambassador/profile/ambassadorProfileController');

router.get('/:id', AuthMiddleWare, ACLMiddleWare, AmbassadorProfileController.details);
router.put('/about-you', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), AmbassadorProfileController.updateAmbassadorAboutYou);
router.put('/about-company', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), AmbassadorProfileController.updateAmbassadorAboutCompany);
router.put('/save-later', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('logo'), AmbassadorProfileController.updateAmbassadorProfileSaveLater);

module.exports = router;
