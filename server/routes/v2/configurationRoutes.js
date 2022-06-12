const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');
const SearchCompanyController = require('../../services/searchCompany/searchCompanyController')
const SearchCertificationController = require('../../services/v2/searchCertification/searchCertificationController')


//signup
router.get('/company/by-name', SearchCompanyController.searchCompany);
router.get('/certification/by-name', SearchCertificationController.searchCertification);

module.exports = router;
