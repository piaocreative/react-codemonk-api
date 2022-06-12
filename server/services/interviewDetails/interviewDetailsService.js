const mongoose = require('mongoose');
const Interview = require('../../models/interview.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for interview details with id
 */
class InterviewDetailsService {
    /**
     * @desc This function is being used to interview details with id
     * @author Innovify
     * @since 09/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async details (req) {
        const aggregateParams = Utils.getInterviewAggregateParams();

        aggregateParams.unshift({
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        });

        const interviewDetails = await Interview.aggregate([aggregateParams]);
        return interviewDetails[0];

    }
}

module.exports = InterviewDetailsService;
