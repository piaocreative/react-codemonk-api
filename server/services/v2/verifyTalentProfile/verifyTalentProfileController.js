const VerifyTalentProfileService = require('./verifyTalentProfileService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for timesheet
 */
class VerifyTalentProfileController {


    /**
     * @desc This function is being used to update verification of the talent
     * @author CodeMonk
     * @since 01/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async verifyTalentProfile (req, res) {
        try {
            const data = await VerifyTalentProfileService.verifyTalentProfile(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('PROFILE_STATUS_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res);
        }
    }

}

module.exports = VerifyTalentProfileController;
