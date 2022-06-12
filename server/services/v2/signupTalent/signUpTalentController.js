
const SignUpTalentService = require('./signUpTalentService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for signup.
 */
class SignUpTalentController {
    /**
     * @desc This function is being used to signUp talent
     * @author CodeMonk
     * @since 22/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async signUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.TALENT;
            const data = await SignUpTalentService.signUp(req, res.__);
            Utils.sendResponse(null, data, res, res.__('REGISTER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

}

module.exports = SignUpTalentController;
