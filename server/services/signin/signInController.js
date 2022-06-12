
const SignInService = require('./signInService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for signin.
 */
class SignInController {
    /**
     * @desc This function is being used to login
     * @author Innovify
     * @since 18/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {string} req.body.password password
     * @param {function} res Response
     */
    static async login (req, res) {
        try {
            const data = await SignInService.signIn(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SIGNIN_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = SignInController;
