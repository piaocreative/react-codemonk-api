
const WorkExperienceProfileService = require('./talentWorkExperienceDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Work Experience Details.
 */
class TalentWorkExperienceDetailsController {

    /**
     * @desc This function is being used to store work experience details of talent user
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveUserWorkExperienceDetails (req, res) {
        try {
            const data = await WorkExperienceProfileService
                .saveUserWorkExperienceDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentWorkExperienceDetailsController;
