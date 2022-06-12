const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const uploadS3 = require('../middleware/uploadDiskSpace');
const QuoteAddController = require('../services/addQuote/addQuoteController');
const QuoteEditController = require('../services/editQuote/editQuoteController');
const QuoteListController = require('../services/quoteList/quoteListController');
const QuoteDetailsController = require('../services/quoteDetails/quoteDetailsController');

router.get('/list', AuthMiddleWare, ACLMiddleWare, QuoteListController.list);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, QuoteDetailsController.details);
router.post('/', AuthMiddleWare, ACLMiddleWare, uploadS3.single('quote'), QuoteAddController.addQuote);
router.put('/', AuthMiddleWare, ACLMiddleWare, uploadS3.single('quote'), QuoteEditController.editQuote);
router.patch('/archive/:id', AuthMiddleWare, ACLMiddleWare, QuoteEditController.archiveQuote);

module.exports = router;
