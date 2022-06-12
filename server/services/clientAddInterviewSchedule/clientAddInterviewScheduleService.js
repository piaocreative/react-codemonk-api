const mongoose = require('mongoose');
const Interview = require('../../models/interview.model');
const ClientAddInterviewValidator = require('./clientAddInterviewScheduleValidator');
const ClientAddInterviewSecondService = require('./clientAddInterviewScheduleSecondService');

const { findOrCreateProjectByName } = require('../addProject/addProjectService');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');
const moment = require('moment');
const HubSpot = require('../hubSpot/hubSpot');

/**
 * Class represents services for add interview for project to talent by client
 */
class ClientAddInterviewService {

    /**
     * @desc This function is being used to add interview for project to talent by client
     * @author Innovify
     * @since 01/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addInterviewSchedule (req, user, local) {
        return await ClientAddInterviewSecondService.addInterviewSchedule(req.body,user,local);
    }
}

module.exports = ClientAddInterviewService;
