const mongoose = require('mongoose');
const JobPost = require('../../../models/jobPost.model');
const EditJobPostPreferredCandidatesValidator = require('./editJobPostPreferredCandidatesValidator');
const EditJobPostPreferredCandidateDTO = require('./dto/editJobPostPreferredCandidateDTO');
const { addSkill } = require('../../skills/skillServices');
const AddJobPostPreferredCandidatesService = require('../addJobPostPreferredCandidates/addJobPostPreferredCandidatesService');

class EditJobPostPreferredCandidatesService {

    static async editJobPostPreferredCandidates (req, user, local) {
        const Validator = new EditJobPostPreferredCandidatesValidator(req.body, local);
        await Validator.editJobPostPreferredCandidates();
        const existingJobBrief = await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
        if (existingJobBrief && existingJobBrief.status === CONSTANTS.BRIEF.STATUS.INACTIVE &&
            existingJobBrief.step === CONSTANTS.BRIEF.STEP.BASIC_DETAILS) {
            return await AddJobPostPreferredCandidatesService.addJobPostPreferredCandidates(req, user, local);
        }

        const jobPost = EditJobPostPreferredCandidateDTO.prepareObject(req.body);
        const jobPostUpdated = await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });
        addSkill(jobPost.hardSkills);
        addSkill(jobPost.softSkills);
        return await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
    }

}

module.exports = EditJobPostPreferredCandidatesService;
