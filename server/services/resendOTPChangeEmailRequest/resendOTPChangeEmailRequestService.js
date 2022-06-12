const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');

/**
 * Class represents services for change email address request resend otp.
 */
class ResendUserEmailRequestService {
    /**
     * @desc This function is being used to change email address request resend otp
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email address
     * @param {object} user Logged in client user data
     */
    static async resendOTP (req, user, local) {
        if (user.registerType && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            throw new CodeMonkError(local('INVALID_EMAIL_CHANGE_REQUEST'), 400);
        }

        const userOtp = await User.findOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            otp: 1, requestedEmail: 1
        });
        const subject = 'You have requested an email address change';
        const template = 'emailTemplates/verificationOtpEMailChange.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        const templateVariables = { appUrl, otp: userOtp.otp };
        await Email.prepareAndSendEmail([userOtp.requestedEmail], subject, template, templateVariables);
    }


}

module.exports = ResendUserEmailRequestService;
