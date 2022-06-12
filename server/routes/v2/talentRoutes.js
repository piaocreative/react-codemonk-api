const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const UploadMiddleWare = require('../../middleware/upload');

const SignUpMiddleWare = require('../../services/signUpTalentDetails/graphQL/signUpTalentMiddleware');
const TalentAboutYouController = require('../../services/talentAboutYou/talentAboutYouController');
const TalentEducationDetailController = require('../../services/v2/talentEducationDetail/talentEducationDetailsController');
const TalentWorkExperienceDetailController = require('../../services/v2/talentWorkExperienceDetail/talentWorkExperienceDetailsController');
const TalentProjectDetailController = require('../../services/v2/talentProjectDetail/talentProjectDetailsController');
const TalentCertificationDetailsController = require('../../services/v2/talentCertificationDetails/talentCertificationDetailsController');
const TalentEducationDetailsController = require('../../services/v2/talentEducationDetails/talentEducationDetailsController');
const TalentWorkExperienceDetailsController =
require('../../services/v2/talentWorkExperienceDetails/talentWorkExperienceDetailsController');
const TalentProjectDetailsController = require('../../services/v2/talentProjectDetails/talentProjectDetailsController');
const TalentSaveLaterController = require('../../services/v2/talentSaveLater/talentSaveLaterController');
const TalentUploadCVController = require('../../services/v2/talentUploadCV/talentUploadCVController');
const TalentPreferenceController = require('../../services/v2/talentPreferenceDetails/talentPreferenceDetailsController');
const TalentPayDetailsController = require('../../services/v2/talentPayDetails/talentPayDetailsController');
const TalentUploadDocumentsController = require('../../services/v2/talentUploadDocuments/talentUploadDocumentsController');
const DownloadTalentDocsController = require('../../services/v2/downloadTalentDocs/downloadTalentDocsController');
const VerifyTalentProfileController = require('../../services/v2/verifyTalentProfile/verifyTalentProfileController');


// onboarding
// signup
router.use('/signup', AuthMiddleWare, ACLMiddleWare, SignUpMiddleWare);
router.put('/about-you', AuthMiddleWare, ACLMiddleWare, TalentAboutYouController.saveUserPersonalDetails);
router.put('/education-details', AuthMiddleWare, ACLMiddleWare, TalentEducationDetailController.saveTalentEducationDetails);
router.put('/workexperience-details', AuthMiddleWare, ACLMiddleWare, TalentWorkExperienceDetailController.saveUserWorkExperienceDetails);
router.put('/project-details', AuthMiddleWare, ACLMiddleWare, TalentProjectDetailController.saveProjectDetails);
router.put('/save-later', AuthMiddleWare, ACLMiddleWare, TalentSaveLaterController.saveLaterUserDetails);
router.put('/cv', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('talentCV'), TalentUploadCVController.uploadTalentCV);
router.put('/preference-details', AuthMiddleWare, ACLMiddleWare, TalentPreferenceController.saveUserPreferenceDetails);
router.put('/pay-details', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('companyLogo'), TalentPayDetailsController.saveUserPayDetails);
router.put('/upload-documents', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
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
}]), TalentUploadDocumentsController.uploadDocuments);

// Project
router.post('/project', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'projectImages', maxCount: 5
}]), TalentProjectDetailsController.addTalentProjectDetails);
router.delete('/project', AuthMiddleWare, ACLMiddleWare, TalentProjectDetailsController.deleteTalentProjectDetails);
router.put('/project', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'projectImages', maxCount: 5
}]), TalentProjectDetailsController.editTalentProjectDetails);

// Education
router.post('/education', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('companyLogo'), TalentEducationDetailsController.addTalentEducationDetails);
router.delete('/education', AuthMiddleWare, ACLMiddleWare, TalentEducationDetailsController.deleteTalentEducationDetails);
router.put('/education', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('companyLogo'), TalentEducationDetailsController.editTalentEducationDetails);

// work experience
router.post('/work-experience', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('companyLogo'), TalentWorkExperienceDetailsController.addTalentWorkExperience);
router.delete('/work-experience', AuthMiddleWare, ACLMiddleWare, TalentWorkExperienceDetailsController.deleteTalentWorkExperience);
router.put('/work-experience', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('companyLogo'), TalentWorkExperienceDetailsController.editTalentWorkExperience);

// Certificate
router.post('/certificate', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('certificate'), TalentCertificationDetailsController.addTalentCertificateDetails);
router.delete('/certificate', AuthMiddleWare, ACLMiddleWare, TalentCertificationDetailsController.deleteTalentCertificateDetails);
router.put('/certificate', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('certificate'), TalentCertificationDetailsController.editTalentCertificateDetails);

router.patch('/:id/verified-profile', AuthMiddleWare, ACLMiddleWare, VerifyTalentProfileController.verifyTalentProfile);


router.get('/download/document', AuthMiddleWare, ACLMiddleWare, DownloadTalentDocsController.downloadTalentDocs);

module.exports = router;
