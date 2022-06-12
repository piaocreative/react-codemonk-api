const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const JobPostApplyValidator = require('./jobPostApplyValidator');

/**
 * Class represents services for agency profile save
 */
class JobPostApplyService {

    /**
     * @desc This function is being used to apply job post by talent
     * @author Innovify
     * @since 27/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async apply (req, user, local) {
        const Validator = new JobPostApplyValidator(req.body, local);
        await Validator.applyJobPost();

        const jobPost = await JobPost.findOne({
            _id: mongoose.Types.ObjectId(req.body.jobPostId),
            'applications.talentId': user._id
        }, {
            _id: 1
        }).lean();

        if (!jobPost) {
            await JobPost.updateOne({
                _id: mongoose.Types.ObjectId(req.body.jobPostId)
            }, {
                $addToSet: {
                    applications: {
                        talentId: user._id,
                        status: 1
                    }
                }
            });
        } else {
            throw new CodeMonkError(local('TALENT_ALREADY_APPLIED'), 400);
        }
    }
}

module.exports = JobPostApplyService;
