const mongoose = require('mongoose');
const JobPost = require('../../../models/jobPost.model');
const AddJobPostPreferredCandidatesValidator = require('./addJobPostPreferredCandidatesValidator');
const VisitHistory = require('../../../models/visitHistory.model');
const AddJobPostPreferredCandidateDTO = require('./dto/addJobPostPreferredCandidateDTO');
const { addSkill } = require('../../skills/skillServices');

class AddJobPostPreferredCandidatesService {

    static async addJobPostPreferredCandidates (req, user, local) {
        const Validator = new AddJobPostPreferredCandidatesValidator(req.body, local);
        await Validator.addJobPostPreferredCandidates();
        const jobPost = AddJobPostPreferredCandidateDTO.prepareObject(req.body);
        jobPost.step = CONSTANTS.BRIEF.STEP.PREFERRED_CANDIDATES;
        jobPost.updatedBy = user._id;
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        await VisitHistory.updateOne({
        }, {
            briefId: mongoose.Types.ObjectId(req.body.id),
            briefPublishedDate: jobPost.updatedAt
        }, {
            upsert: true
        });
        addSkill(jobPost.hardSkills);
        addSkill(jobPost.softSkills);
        return await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
    }

}

module.exports = AddJobPostPreferredCandidatesService;
