const AddJobPostService = require('./addJobPostService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin add job post details.
 */
class AddJobPostController {

    /**
     * @desc This function is being used to add job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addJobPost (req, res) {
        try {

            const data = await AddJobPostService.addJobPost(req, res.locals.user, res.__);
            if (res.locals.user.role === CONSTANTS.ROLE.CLIENT) {
                Utils.sendResponse(null, data, res, res.__('CLIENT_ADD_BRIEF_SUCCESS', data.name));
            } else {
                Utils.sendResponse(null, data, res, res.__('ADD_BRIEF_SUCCESS', data.name));
            }

        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddJobPostController;
