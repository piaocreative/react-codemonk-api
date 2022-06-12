const mongoose = require('mongoose');
const Interview = require('../../models/interview.model');
const AdminInterviewChangeStatusValidator = require('./adminInterviewChangeStatusValidator');

/**
 * Class represents services for admin change interview status
 */
class AdminInterviewChangeStatusService {
    /**
     * @desc This function is being used to admin change interview status
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async status (req, local) {
        const Validator = new AdminInterviewChangeStatusValidator(req.body, local);
        await Validator.changeInteviewStatusByAdmin();

        return await Interview.updateOne({
            _id: mongoose.Types.ObjectId(req.body.interviewId)
        }, {
            $set: {
                status: parseInt(req.body.status)
            }
        });
    }
}

module.exports = AdminInterviewChangeStatusService;
