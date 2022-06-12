const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyCredentialsEditValidator = require('./agencyCredentialsEditValidator');

/**
 * Class represents services for agency update certificate and credetials
 */
class AgencyCredentialsEditService {

    /**
     * @desc This function is being used to agency edit credetials
     * @author Innovify
     * @since 06/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editCredentials (req, user, local) {
        const Validator = new AgencyCredentialsEditValidator(req.body, local);
        Validator.validateCredentialsUrl();

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                'socialProfile.linkedInUrl': (req.body.linkedInUrl) ? req.body.linkedInUrl : '',
                'socialProfile.gitHubUrl': (req.body.gitHubUrl) ? req.body.gitHubUrl : '',
                'socialProfile.dribbbleUrl': (req.body.dribbbleUrl) ? req.body.dribbbleUrl : '',
                'socialProfile.clutchUrl': (req.body.clutchUrl) ? req.body.clutchUrl : '',
                'socialProfile.goodfirmsUrl': (req.body.goodfirmsUrl) ? req.body.goodfirmsUrl : '',
                'socialProfile.otherWebsiteUrl': (req.body.otherWebsiteUrl) ? req.body.otherWebsiteUrl : ''
            }
        });
    }
}

module.exports = AgencyCredentialsEditService;
