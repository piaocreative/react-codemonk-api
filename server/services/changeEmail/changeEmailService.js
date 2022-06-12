const mongoose = require('mongoose');
const User = require('../../models/user.model');
const UserChangeEmailValidator = require('./changeEmailValidator');
const UtilFunctions = require('../../util/utilFunctions');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services for change email address.
 */
class UserChangeEmailService {
    /**
     * @desc This function is being used to change email address
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp to confirm
     * @param {object} user Logged in client user data
     */
    static async changeEmail (req, user, local) {
        const Validator = new UserChangeEmailValidator(req.body, local);
        await Validator.otp(req.body.otp);
        if (user.registerType && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            throw new CodeMonkError(local('INVALID_EMAIL_CHANGE_REQUEST'), 400);
        }

        const userDetails = await User.findOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            otp: 1, requestedEmail: 1
        });

        if (userDetails && userDetails.otp === req.body.otp) {
            await User.updateOne({
                _id: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    email: userDetails.requestedEmail,
                    otp: UtilFunctions.generateOtp(),
                    requestChangeEmail: 0
                }
            });
        } else {
            throw new CodeMonkError(local('INVALID_OTP'), 400);
        }

        // TO DO  Update email to engageBay
    }
}

module.exports = UserChangeEmailService;
