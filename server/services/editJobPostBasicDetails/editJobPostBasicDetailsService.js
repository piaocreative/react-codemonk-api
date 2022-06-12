const mongoose = require('mongoose');
const JobPost = require('../../models/jobPost.model');
const EditJobPostBasicDetailsValidator = require('./editJobPostBasicDetailsValidator');
const Utils = require('../../util/utilFunctions');
const { ROLE: { CLIENT } } = require('../../util/constants');

class EditJobPostBasicDetailsService {

    static async editJobPostBasicDetails(req, local) {
        const Validator = new EditJobPostBasicDetailsValidator(req.body, local);
        await Validator.editJobPostBasicDetails();
        const jobPost = Utils.prepareJobPostBasicDetailsObject(req.body, local);
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        return await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
    }


}

module.exports = EditJobPostBasicDetailsService;
