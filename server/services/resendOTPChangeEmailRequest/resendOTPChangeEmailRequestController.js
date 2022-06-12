
const ResendUserEmailChangeService = require('./resendOTPChangeEmailRequestService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for change email address request resend otp.
 */
class ResendUserEmailChangeController {

    /**
     * @desc This function is being used to change email address request resend otp
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email address
     */
    static async resendOTP (req, res) {
        try {
            const data = await ResendUserEmailChangeService.resendOTP(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS_EMAIL_CHANGE_REQUEST'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ResendUserEmailChangeController;
