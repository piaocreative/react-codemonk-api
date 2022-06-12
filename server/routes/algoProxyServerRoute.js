const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const AlgoProxyServerMiddleWare = require('../middleware/algoProxyServer');
const AlgoServerController = require('../services/algoProxyServer/algoServerController');


router.get('/talent/test', AuthMiddleWare, AlgoServerController.getSkillsByTalentId);
router.get('/job-brief/:id/recommended-candidates', AuthMiddleWare,ACLMiddleWare, AlgoServerController.getRecommandedCandidatesFromJobRole);
router.get('/job-brief/:id/rec_candidates', AlgoServerController.getRecCandidatesFromJobId);
router.get('/talent/:id/rec_jobs', AlgoServerController.getRecJobsFromTalentId);
router.post('/test-url', AuthMiddleWare, ACLMiddleWare, AlgoServerController.testUrl);

router.use('/', AuthMiddleWare, AlgoProxyServerMiddleWare);

module.exports = router;
