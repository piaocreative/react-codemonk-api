
const TalentSaveLaterService = require('./talentSaveLaterService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Save Later.
 */
class TalentSaveLaterController {

    /**
     * @desc This function is being used to update talent profile details save later
     * @author Innovify
     * @since 02/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveLaterUserDetails (req, res) {
        try {
            const data = await TalentSaveLaterService.saveLaterUserDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SAVE_LATER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentSaveLaterController;
