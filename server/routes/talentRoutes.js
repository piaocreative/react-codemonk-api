const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const TalentRegisterTypeController = require('../services/talentRegisterType/talentRegisterTypeController');
const TalentEditDetailsController = require('../services/talentEditDetails/talentEditDetailsController');
const TalenProjectDetailsController = require('../services/talentProjectDetails/talentProjectDetailsController');
const TalentWorkExperienceDetailsController = require('../services/talentWorkExperienceDetails/talentWorkExperienceDetailsController');
const TalentEducationDetailsController = require('../services/talentEducationDetails/talentEducationDetailsController');
const TalentPreferenceController = require('../services/talentPreferenceDetails/talentPreferenceDetailsController');
const TalentPayDetailsController = require('../services/talentPayDetails/talentPayDetailsController');
const TalentSaveLaterController = require('../services/talentSaveLater/talentSaveLaterController');
const TalentProfilePeronsalController = require('../services/talentBasicProfile/talentBasicProfileController');
const TalentProfessionalProfileController = require('../services/talentProfessionalDetails/talentProfessionalProfileController');
const TalentDashboardController = require('../services/talentDashboard/talentDashboardController');
const TalentSearchController = require('../services/talentSearch/talentSearchController');
const TalentDetailsController = require('../services/talentDetails/talentDetailsController');
const TalentSearchByNameController = require('../services/talentSearchByName/talentSearchByNameController');
const TalentGetRolesCountController = require('../services/getTalentRolesCount/getTalentRolesCountController');
const TalentProjectListController = require('../services/talentProjectList/talentProjectListController');
const TalentUploadCVController = require('../services/talentUploadCV/talentUploadCVController');
const TalentListController = require('../services/talentList/talentListController');
const TalentStatusChangeController = require('../services/talentStatusChange/talentStatusChangeController');
const TalentCountryWiseController = require('../services/talentCountryWise/talentCountryWiseController');
const FeatureTalentsController = require('../services/featureTalents/featureTalentsController');
const TalentSkills = require('../services/skills/talentSkillsController');
const TalentIndustries = require('../services/industries/industriesController');
const TalentCompanyCultures = require('../services/companycultures/companyCulturesController');
const CertificationsController = require('../services/certifications/certificationsController');
const EnlistTestForTalentController = require('../services/EnlistTestsForTalent/enlistTestForTalentController');
const StartTestForTalentController = require('../services/startTestsForTalent/startTestForTalentController');
const ExtractTestForTalentController = require('../services/extractTalentTestResult/extractTalentTestResultController');
const CallbackTestForTalentController = require('../services/callbackOfTestFortalent/callbackOfTestForTalentController');

// Onboarding
router.put('/register-type', AuthMiddleWare, ACLMiddleWare, TalentRegisterTypeController.talentRegisterType);
router.put('/personal-details', AuthMiddleWare, ACLMiddleWare, TalentProfilePeronsalController.saveUserPersonalDetails);
router.put('/professional-details', AuthMiddleWare, ACLMiddleWare, TalentProfessionalProfileController.saveUserProfessionalDetails);
router.put('/project-details', AuthMiddleWare, ACLMiddleWare, TalenProjectDetailsController.saveProjectDetails);
router.put('/workexperience-details', AuthMiddleWare, ACLMiddleWare, TalentWorkExperienceDetailsController.saveUserWorkExperienceDetails);
router.put('/education-details', AuthMiddleWare, ACLMiddleWare, TalentEducationDetailsController.saveTalentEducationDetails);
router.put('/preference-details', AuthMiddleWare, ACLMiddleWare, TalentPreferenceController.saveUserPreferenceDetails);
router.put('/pay-details', AuthMiddleWare, ACLMiddleWare, TalentPayDetailsController.saveUserPayDetails);
router.put('/save-later', AuthMiddleWare, ACLMiddleWare, TalentSaveLaterController.saveLaterUserDetails);

// Profile EDIT Panel
router.put('/profile', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentProfileDetails);
router.put('/summary', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentSummary);
router.put('/rate', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentRate);
router.put('/skills', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentSkillsDetails);
router.put('/professional-url', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentProfessionalUrlDetails);
router.put('/preferences', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentPreferenceDetails);
router.put('/availability', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentAvailabilityDetails);
router.put('/billing', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
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
}]), TalentEditDetailsController.editTalentBillingDetails);
router.put('/payment', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentPaymentDetails);
router.put('/languages', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentLanguages);

// Project
router.post('/project', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.addTalentProjectDetails);
router.delete('/project', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.deleteTalentProjectDetails);
router.put('/project', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentProjectDetails);

// Education
router.post('/education', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.addTalentEducationDetails);
router.delete('/education', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.deleteTalentEducationDetails);
router.put('/education', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentEducationDetails);

// work experience
router.post('/work-experience', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.addTalentWorkExperience);
router.delete('/work-experience', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.deleteTalentWorkExperience);
router.put('/work-experience', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentWorkExperience);

// Certificate
router.post('/certificate', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.addTalentCertificateDetails);
router.delete('/certificate', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.deleteTalentCertificateDetails);
router.put('/certificate', AuthMiddleWare, ACLMiddleWare, TalentEditDetailsController.editTalentCertificateDetails);

// Dashboard
router.post('/invite', AuthMiddleWare, ACLMiddleWare, TalentDashboardController.inviteFriends);

// Talent Search
router.get('/search', AuthMiddleWare, ACLMiddleWare, TalentSearchController.search);

// Talent Details
router.get('/details/:id', AuthMiddleWare, ACLMiddleWare, TalentDetailsController.details);
router.get('/download/:id', AuthMiddleWare, ACLMiddleWare, TalentDetailsController.downloadProfile);
router.get('/download', AuthMiddleWare, ACLMiddleWare, TalentDetailsController.downloadProfile);
router.get('/by-name', AuthMiddleWare, ACLMiddleWare, TalentSearchByNameController.searchByName);
router.get('/roles/count', TalentGetRolesCountController.getTalentRolesCount);
router.get('/project/list', AuthMiddleWare, ACLMiddleWare, TalentProjectListController.list);
router.put('/cv', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('talentCV'), TalentUploadCVController.uploadTalentCV);
router.get('/project/search', AuthMiddleWare, ACLMiddleWare, TalentProjectListController.names);
router.get('/list', AuthMiddleWare, ACLMiddleWare, TalentListController.list);
router.put('/status', AuthMiddleWare, ACLMiddleWare, TalentStatusChangeController.changeStatus);
// Other details
router.get('/country/count', TalentCountryWiseController.getTalentCount);
router.get('/feature', FeatureTalentsController.featureTalents);
router.get('/skills', TalentSkills.skills);
router.get('/companycultures', TalentCompanyCultures.companyCultures);

router.get('/industries', TalentIndustries.industries);
router.get('/certifications', CertificationsController.certifications);


// Tests
router.get('/tests', AuthMiddleWare, ACLMiddleWare, EnlistTestForTalentController.enlistTests);
router.post('/start-test', AuthMiddleWare, ACLMiddleWare, StartTestForTalentController.startTest);
router.get('/tests/:id', AuthMiddleWare, ACLMiddleWare, ExtractTestForTalentController.extractTest);
router.post('/tests/callback', CallbackTestForTalentController.callbackTest);

// event log 
router.get('/log/:id', AuthMiddleWare, ACLMiddleWare, TalentListController.log);

module.exports = router;
