const EditJobPostService = require('./editJobPostService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for admin edit job post details.
 */
class EditJobPostController {

    /**
     * @desc This function is being used to edit admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async editJobPost (req, res) {
        try {
            const data = await EditJobPostService.editJobPost(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to archive job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async archiveJobPost (req, res) {
        await EditJobPostService.archiveJobPost(req, res.locals.user, res.__);
        Utils.sendResponse(null, null, res, res.__('BRIEF_ARCHIVE_SUCCESS'));
    }
}

module.exports = EditJobPostController;
