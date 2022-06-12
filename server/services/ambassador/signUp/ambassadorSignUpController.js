const AmbassadorSignUpService = require('./ambassadorSignUpService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for signup.
 */
class SignUpRecruiterController {
    /**
     * @desc This function is being used to signUp an Ambassador
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async signUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.AMBASSADOR;
            const data = await AmbassadorSignUpService.signUp(req, res.__);
            Utils.sendResponse(null, data, res, res.__('REGISTER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

}

module.exports = SignUpRecruiterController;
