
const UserEmailChangeService = require('./changeEmailService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for change email address.
 */
class UserEmailChangeController {

    /**
     * @desc This function is being used to change email address
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp for confirm
     */
    static async changeEmail (req, res) {
        try {
            const data = await UserEmailChangeService.changeEmail(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS_EMAIL_CHANGE'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = UserEmailChangeController;
