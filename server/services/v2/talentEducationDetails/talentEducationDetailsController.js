
const TalentEducationDetailsService = require('./talentEducationDetailsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Education Details.
 */
class TalentEducationDetailsController {

    /**
 * @desc This function is being used to add talent education
 *  at beginning of education array
 * @author CodeMonk
 * @since 18/10/2021
 * @param {Object} req Request
 * @param {Object} req.body RequestBody
 * @param {function} res Response
 */
    static async addTalentEducationDetails(req, res) {
        try {
            const data = await TalentEducationDetailsService.addTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent education
     *  from talent object education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentEducationDetails(req, res) {
        try {
            const data = await TalentEducationDetailsService.deleteTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a education
     *  from talent object education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentEducationDetails(req, res) {
        try {
            const data = await TalentEducationDetailsService.editTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentEducationDetailsController;
