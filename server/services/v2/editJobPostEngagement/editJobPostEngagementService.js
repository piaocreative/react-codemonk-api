const mongoose = require('mongoose');
const JobPost = require('../../../models/jobPost.model');
const EditJobPostEngagementValidator = require('./editJobPostEngagementValidator');
const EditJobPostEngagementDTO = require('./dto/editJobPostEngagementDTO');
const AddJobPostEngagementService = require('../addJobPostEngagement/addJobPostEngagementService');

class EditJobPostEngagementService {

    static async editJobPostEngagement (req, user, local) {
        if (req.body && req.body.employmentType && typeof req.body.employmentType === 'string') {
            req.body.employmentType = req.body && req.body.employmentType ? req.body.employmentType.split(',') : [];
        }
        const Validator = new EditJobPostEngagementValidator(req.body, local);
        await Validator.editJobPostEngagement();
        const existingJobBrief = await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
        if (existingJobBrief && existingJobBrief.status === CONSTANTS.BRIEF.STATUS.INACTIVE &&
            existingJobBrief.step === CONSTANTS.BRIEF.STEP.PREFERRED_CANDIDATES) {
            return await AddJobPostEngagementService.addJobPostEngagement(req, user, local);
        }

        const jobPost = EditJobPostEngagementDTO.prepareObject(req.body);
        const jobPostUpdated = await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        return jobPostUpdated;
    }

}

module.exports = EditJobPostEngagementService;
