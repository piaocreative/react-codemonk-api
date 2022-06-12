
const Utils = require('../../../util/utilFunctions');


/**
 * Class represents controller for user Basic Profile.
 */
class UserProfileResponse {

    /**
     * @desc This function is being used to get user details
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async sendResponse (req, res) {
        try {
            console.log('Sending response')
            Utils.sendResponse(null, null, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = UserProfileResponse;

