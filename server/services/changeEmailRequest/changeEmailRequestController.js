
const UserEmailChangeRequestService = require('./changeEmailRequestService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for change email address request.
 */
class UserEmailChangeRequestController {

    /**
     * @desc This function is being used to change email address request
     * @author Innovify
     * @since 18/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email address
     */
    static async changeEmailRequest (req, res) {
        try {
            const data = await UserEmailChangeRequestService.changeEmailRequest(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS_EMAIL_CHANGE_REQUEST'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = UserEmailChangeRequestController;
