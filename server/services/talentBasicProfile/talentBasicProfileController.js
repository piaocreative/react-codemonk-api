
const DeveloperProfileService = require('./talentBasicProfileService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Basic Profile.
 */
class TalentBasicProfileController {

    /**
     * @desc This function is being used to update talent personal details
     * @author Innovify
     * @since 02/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserPersonalDetails (req, res) {
        try {
            const data = await DeveloperProfileService
                .saveUserPersonalDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentBasicProfileController;
