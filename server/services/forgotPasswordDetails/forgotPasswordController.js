const ForgotPasswordService = require('./forgotPasswordService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for forgot password Details.
 */

class ForgotPasswordController {

    /**
     * @desc This function is being used to generate reset link to reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email of user to reset password
     * @param {function} res Response
     */
    static async forgotPassword (req, res) {
        try {
            const data = await ForgotPasswordService.forgotPassword(req, res.__);
            Utils.sendResponse(null, data, res, res.__('FORGOT_PASSWORD_LINK_SENT_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to verify token for reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.token token to verify it's valid or not
     * @param {function} res Response
     */
    static async verifyToken (req, res) {
        try {
            const data = await ForgotPasswordService.verifyToken(req, res.__);
            Utils.sendResponse(null, data, res, res.__('LINK_IS_VALID'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }


    /**
     * @desc This function is being used to verify token for reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.token token to verify it's valid or not
     */
    static async resetPassword (req, res) {
        try {
            const data = await ForgotPasswordService.resetPassword(req, res.__);
            Utils.sendResponse(null, data, res, res.__('RESET_PASSWORD_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = ForgotPasswordController;

