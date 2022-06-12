const mongoose = require('mongoose');
const Recruiter = require('../../../../models/recruiter.model');
const User = require('../../../../models/user.model');
const RecruiterStatusChangeValidator = require('./recruiterStatusChangeValidator');

/**
 * Class represents services for recruiter status change
 */
class RecruiterDetailsService {
    /**
     * @desc This function is being used to recruiter status change
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {String} req.body.recruiterId params recruiter id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, local) {
        const Validator = new RecruiterStatusChangeValidator(req.body, local);
        await Validator.recruiterStatusChange();

        await Recruiter.updateOne({
            userId: mongoose.Types.ObjectId(req.body.recruiterId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });

        await User.updateOne({
            _id: mongoose.Types.ObjectId(req.body.recruiterId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });
    }
}

module.exports = RecruiterDetailsService;
