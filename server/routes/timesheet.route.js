const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');

const TimeSheetController = require('../services/timesheet/timesheetController');
const LogsController = require('../services/v1/timesheet/timesheetLogs/logsController');

router.post('/', AuthMiddleWare, ACLMiddleWare, TimeSheetController.addTimeSheet);
router.get('/', AuthMiddleWare, ACLMiddleWare, TimeSheetController.listTimeSheet);
router.get('/:id', AuthMiddleWare, ACLMiddleWare, TimeSheetController.getTimeSheet);
router.put('/:id', AuthMiddleWare, ACLMiddleWare, TimeSheetController.updateTimeSheet);
router.patch('/:id', AuthMiddleWare, ACLMiddleWare, TimeSheetController.updateTimeSheetStatus);
router.get('/:id/logs', AuthMiddleWare, ACLMiddleWare, LogsController.logs);

module.exports = router;
