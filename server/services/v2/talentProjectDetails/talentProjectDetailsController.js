
const TalentProjectDetailsService = require('./talentProjectDetailsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Project Details.
 */
class TalentProjectDetailsController {

    /**
     * @desc This function is being used to add talent project at beginning of project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentProjectDetails (req, res) {
        try {
            const data = await TalentProjectDetailsService.addTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent project from talent object project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentProjectDetails (req, res) {
        try {
            const data = await TalentProjectDetailsService.deleteTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentProjectDetails (req, res) {
        try {
            const data = await TalentProjectDetailsService.editTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentProjectDetailsController;
