
const TalentUploadCVService = require('./talentUploadCVService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for talent upload CV
 */
class TalentUploadCVController {

    /**
     * @desc This function is being used to talent upload CV
     * @author CodeMonk
     * @since 27/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadTalentCV (req, res) {
        try {
            const data = await TalentUploadCVService.uploadTalentCV(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentUploadCVController;
