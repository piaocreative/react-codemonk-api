const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const UserProfileController = require('../services/userProfile/userProfileController');
const UserDocumentController = require('../services/userDocuments/userDocumentsController');
const UserChangeEmailRequestController = require('../services/changeEmailRequest/changeEmailRequestController');
const UserResendChangeEmailRequestController = require('../services/resendOTPChangeEmailRequest/resendOTPChangeEmailRequestController');
const UserChangeEmailController = require('../services/changeEmail/changeEmailController');

router.get('/details', AuthMiddleWare, ACLMiddleWare, UserProfileController.getUserDetails);
router.put('/picture', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('photo'), UserProfileController.updateProfilePicture);
router.delete('/picture', AuthMiddleWare, ACLMiddleWare, UserProfileController.deleteProfilePicture);
router.get('/checkurl', AuthMiddleWare, ACLMiddleWare, UserProfileController.checkURL);
router.put('/password', AuthMiddleWare, ACLMiddleWare, UserProfileController.changePassword);
router.put('/documents', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'idProof', maxCount: 1
},
{
    name: 'addressProof', maxCount: 1
},
{
    name: 'companyIncorporationCertificateUrl', maxCount: 1
},
{
    name: 'companyVatRegistrationCertificateUrl', maxCount: 1
},
{
    name: 'companyInsuranceDocumentUrl', maxCount: 1
}]), UserDocumentController.uploadPayDocuments);
router.delete('/documents', AuthMiddleWare, ACLMiddleWare, UserDocumentController.deleteuserDocument);
router.put('/email', AuthMiddleWare, ACLMiddleWare, UserChangeEmailRequestController.changeEmailRequest);
router.put('/email/resend-otp', AuthMiddleWare, ACLMiddleWare, UserResendChangeEmailRequestController.resendOTP);
router.put('/email/change', AuthMiddleWare, ACLMiddleWare, UserChangeEmailController.changeEmail);

module.exports = router;
