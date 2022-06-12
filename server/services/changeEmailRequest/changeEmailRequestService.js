const mongoose = require('mongoose');
const User = require('../../models/user.model');
const UserChangeEmailRequestValidator = require('./changeEmailRequestValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const UserProfileService = require('../userProfile/userProfileService');

/**
 * Class represents services for change email address request.
 */
class UserChangeEmailRequestService {
    /**
     * @desc This function is being used to change email address request
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email address
     * @param {object} user Logged in client user data
     */
    static async changeEmailRequest (req, user, local) {
        const Validator = new UserChangeEmailRequestValidator(req.body, local);
        await Validator.email(req.body.email);
        if (user.registerType && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            throw new CodeMonkError(local('INVALID_EMAIL_CHANGE_REQUEST'), 400);
        }

        if ([CONSTANTS.ROLE.TALENT, CONSTANTS.ROLE.CLIENT].indexOf(user.role) !== -1 ) {
            await UserProfileService.checkOldPassword(req.body, user, local);
        }
        const email = req.body.email;
        await UserChangeEmailRequestService.isEmailExists(user._id, email, local);
        const otp = UtilFunctions.generateOtp();
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                otp: (process.env.NODE_ENV !== 'testing') ? otp : '123456',
                requestedEmail: email
            }
        });

        const subject = 'You have requested an email address change';
        const template = 'emailTemplates/verificationOtpEMailChange.html';
        const appUrl = process.env.FRONTEND_URL_TALENT;
        const templateVariables = { appUrl, otp };
        await Email.prepareAndSendEmail([email], subject, template, templateVariables);
    }

    static async isEmailExists (userId, email, local) {
        const isEmailExists = await User.findOne({ email, _id: { $ne: userId } }, { _id: 1 });

        if (isEmailExists) {
            throw new CodeMonkError(local('EMAIL_ALREADY_EXISTS'), 400);
        }
    }
}

module.exports = UserChangeEmailRequestService;
