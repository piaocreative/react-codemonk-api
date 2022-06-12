const router = require('express').Router();
const AuthMiddleWare = require('../../middleware/auth');
const ACLMiddleWare = require('../../middleware/acl');

const AddTimeSheetController = require('../../services/addTimesheet/addTimesheetController');
const DownloadBillController = require('../../services/downloadBill/downloadBillController');

router.post('/', AuthMiddleWare, ACLMiddleWare, AddTimeSheetController.addTimeSheet);
router.get('/', AuthMiddleWare, ACLMiddleWare, AddTimeSheetController.listTimeSheet);
router.put('/:id', AuthMiddleWare, ACLMiddleWare, AddTimeSheetController.updateTimeSheet);
router.get('/:id/download/bill', AuthMiddleWare, ACLMiddleWare, DownloadBillController.downloadBill);

module.exports = router;
