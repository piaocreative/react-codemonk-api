
const AgencySaveLaterService = require('./agencySaveLaterService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency onboarding save-later
 */
class AgencySaveLaterController {

    /**
     * @desc This function is being used to agency onboarding save-later
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response`
     */
    static async saveLater (req, res) {
        try {
            const data = await AgencySaveLaterService.saveLater(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SAVE_LATER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AgencySaveLaterController;
