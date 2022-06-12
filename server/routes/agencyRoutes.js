const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const UploadMiddleWareDiskSpace = require('../middleware/uploadDiskSpace');
const AgencySaveLaterController = require('../services/agencySaveLater/agencySaveLaterController');
const AgencyProfileController = require('../services/agencyProfile/agencyProfileController');
const AgencyAddTalentsController = require('../services/agencyAddTalents/agencyAddTalentsController');
const AgencyCertificateDetails = require('../services/agencyCertificateDetails/agencyCertificateDetailsController');
const AgencyPayDetailsController = require('../services/agencyPayDetails/agencyPayDetailsController');
const AgencyAddDirectorsController = require('../services/agencyAddDirectors/agencyAddDirectorsController');
const AgencyDocumentsController = require('../services/agencyDocuments/agencyDocumentsController');
const AgencyCreateTalentController = require('../services/agencyCreateTalents/agencyCreateTalentsController');
const AgencyEditTalentController = require('../services/agencyEditTalent/agencyEditTalentController');
const AgencyDeleteTalentController = require('../services/agencyDeleteTalent/agencyDeleteTalentController');
const AgencyTalentsListController = require('../services/agencyTalentList/agencyTalentListController');
const AgencyUploadTalentsController = require('../services/agencyUploadTalents/agencyUploadTalentsController');
const AgencyCertificateEditController = require('../services/agencyCertificateEdit/agencyCertificateEditController');
const AgencyCredentialsEditController = require('../services/agencyCredentialsEdit/agencyCredentialsEditController');
const AgencyProjectListController = require('../services/agencyProjectList/agencyProjectListController');
const AgencyProjectCountController = require('../services/agencyProjectsCount/agencyProjectsCountController');
const AgencyTalentsCountController = require('../services/agencyTalentsCount/agencyTalentsCountController');
const AgencyTalentsTeamController = require('../services/agencyTalentsRoleWiseCount/agencyTalentsRoleWiseCountController');
const AgencySubmitQuoteController = require('../services/submitQuote/submitQuoteController');
const AgencyDetailsController = require('../services/agencyDetails/agencyDetailsController');
const AgencyListController = require('../services/agencyList/agencyListController');
const AgencyStatusController = require('../services/agencyStatusChange/agencyStatusChangeController');


// Agency Routes
router.put('/save-later', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'tradingLogo', maxCount: 1
}]), AgencySaveLaterController.saveLater);
router.put('/profile', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'tradingLogo', maxCount: 1
}]), AgencyProfileController.updateProfile);

router.put('/certificate-details', AuthMiddleWare, ACLMiddleWare, AgencyCertificateDetails.updateCertificate);
router.put('/pay-details', AuthMiddleWare, ACLMiddleWare, AgencyPayDetailsController.updatePayDetails);
router.put('/directors', AuthMiddleWare, ACLMiddleWare, AgencyAddDirectorsController.updateDirectorsDetails);
router.put('/documents', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.fields([{
    name: 'idProof0', maxCount: 1
},
{
    name: 'addressProof0', maxCount: 1
},
{
    name: 'idProof1', maxCount: 1
},
{
    name: 'addressProof1', maxCount: 1
},
{
    name: 'companyIncorporationCertificateUrl', maxCount: 1
},
{
    name: 'companyTaxRegistrationCertificateUrl', maxCount: 1
},
{
    name: 'utilityBillDocumentUrl', maxCount: 1
}]), AgencyDocumentsController.uploadAgencyDocuments);
router.delete('/documents', AuthMiddleWare, ACLMiddleWare, AgencyDocumentsController.deleteAgencyDocuments);

router.post('/talent', AuthMiddleWare, ACLMiddleWare, AgencyCreateTalentController.createAgencyTalent);
router.put('/talent', AuthMiddleWare, ACLMiddleWare, AgencyEditTalentController.editTalent);
router.delete('/talent', AuthMiddleWare, ACLMiddleWare, AgencyDeleteTalentController.deleteTalent);
router.put('/talents', AuthMiddleWare, ACLMiddleWare,
    UploadMiddleWare.single('agency-talents'), AgencyUploadTalentsController.uploadTalentList);

router.post('/talents', AuthMiddleWare, ACLMiddleWare, AgencyAddTalentsController.addTalents);
router.post('/talents-invite', AuthMiddleWare, ACLMiddleWare, AgencyCreateTalentController.inviteAgencyTalents);

router.get('/talent/list', AuthMiddleWare, ACLMiddleWare, AgencyTalentsListController.agencyTalentList);
router.put('/certificates', AuthMiddleWare, ACLMiddleWare, AgencyCertificateEditController.editCertificates);
router.put('/credentials', AuthMiddleWare, ACLMiddleWare, AgencyCredentialsEditController.editCredentials);
router.get('/project/list', AuthMiddleWare, ACLMiddleWare, AgencyProjectListController.list);
router.get('/projects/count', AuthMiddleWare, ACLMiddleWare, AgencyProjectCountController.count);
router.get('/project/talents/count', AuthMiddleWare, ACLMiddleWare, AgencyTalentsCountController.count);
router.get('/project/team/count', AuthMiddleWare, ACLMiddleWare, AgencyTalentsTeamController.count);

router.post('/quote/submit', AuthMiddleWare, ACLMiddleWare, UploadMiddleWareDiskSpace.fields([{
    name: 'projectPlan', maxCount: 1
},
{
    name: 'effrotsBreakdown', maxCount: 1
}]), AgencySubmitQuoteController.submitQuote);
router.get('/list', AuthMiddleWare, ACLMiddleWare, AgencyListController.list);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, AgencyDetailsController.details);
router.put('/status', AuthMiddleWare, ACLMiddleWare, AgencyStatusController.changeStatus);


module.exports = router;
