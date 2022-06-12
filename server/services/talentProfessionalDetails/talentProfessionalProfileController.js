
const ProfessionalProfileService = require('./talentProfessionalProfileService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Professional Profile.
 */
class TalentProfessionalProfileController {

    /**
     * @desc This function is being used to save professional details of talent
     * @author Innovify
     * @since 04/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserProfessionalDetails (req, res) {
        try {
            const data = await ProfessionalProfileService
                .saveUserProfessionalDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentProfessionalProfileController;
