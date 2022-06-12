
const TalentWorkExperienceDetailsService = require('./talentWorkExperienceDetailsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent WorkExperience Details.
 */
class TalentWorkExperienceDetailsController {

    /**
     * @desc This function is being used to add talent work experience
     *  beginning of workExperience array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentWorkExperience (req, res) {
        try {
            const data = await TalentWorkExperienceDetailsService.addTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent work experience
     *  based on id of workExperience array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentWorkExperience (req, res) {
        try {
            const data = await TalentWorkExperienceDetailsService.deleteTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a talent work experience
     *  based on id of workExperience array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentWorkExperience (req, res) {
        try {
            const data = await TalentWorkExperienceDetailsService.editTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = TalentWorkExperienceDetailsController;
