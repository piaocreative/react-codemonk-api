
const ClientAddInterviewScheduleService = require('./clientAddInterviewScheduleService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for add interview for project to talent by client
 */
class ClientAddInterviewScheduleController {

    /**
     * @desc This function is being used to add interview for project to talent by client
     * @author Innovify
     * @since 01/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addInterviewSchedule (req, res) {
        try {
            const data = await ClientAddInterviewScheduleService.addInterviewSchedule(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('INTERVIEW_SCHEDULE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ClientAddInterviewScheduleController;
