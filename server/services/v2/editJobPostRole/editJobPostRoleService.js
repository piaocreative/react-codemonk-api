const mongoose = require('mongoose');
const JobPost = require('../../../models/jobPost.model');
const EditJobPostRoleValidator = require('./editJobPostRoleValidator');
const Utils = require('../../../util/utilFunctions');

class EditJobPostRoleService {

    static async editJobPostRole (req, local) {
        const Validator = new EditJobPostRoleValidator(req.body, local);
        await Validator.editJobPostRole();
        const jobPost = Utils.prepareJobPostRoleObject(req.body, local);
        await JobPost.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            $set: jobPost
        });

        return await JobPost.findById(mongoose.Types.ObjectId(req.body.id));
    }


}

module.exports = EditJobPostRoleService;
