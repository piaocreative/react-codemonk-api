
const UserProfileService = require('./userProfileService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for user Basic Profile.
 */
class UserProfileController {

    /**
     * @desc This function is being used to get user details
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async getUserDetails (req, res) {
        const data = await UserProfileService.getUserDetails(res.locals.user);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }

    /**
     * @desc This function is being used to update talent profile picture
     * @author Innovify
     * @since 02/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     */
    static async updateProfilePicture (req, res) {
        try {
            const data = await UserProfileService.updateProfilePicture(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent profile picture
     * @author Innovify
     * @since 11/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteProfilePicture (req, res) {
        const data = await UserProfileService.deleteProfilePicture(res.locals.user);
        Utils.sendResponse(null, data, res, res.__('PHOTO_DELETE_SUCCESS'));
    }

    /**
     * @desc This function is being used to check professional details url
     * @author Innovify
     * @since 09/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async checkURL (req, res) {
        try {
            const data = await UserProfileService.checkURL(req.query, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to change password of a user profile
     * @author Innovify
     * @since 27/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async changePassword (req, res) {
        try {
            const data = await UserProfileService.changePassword(req.body, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('CHANGE_PASSWORD_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = UserProfileController;
