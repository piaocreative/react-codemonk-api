
const TalentCertificationDetailsService = require('./talentCertificationDetailsService');
const Utils = require('../../../util/utilFunctions');

/**
 * Class represents controller for Talent Certification Details.
 */
class TalentCertificationDetailsController {

    /**
     * @desc This function is being used to add talent certificate at
     *  beginning of certificate array
     * @author Codemonk
     * @since 18/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentCertificateDetails (req, res) {
        try {
            const data = await TalentCertificationDetailsService.addTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent certificate
     *  from object certificate array
     * @author Codemonk
     * @since 18/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentCertificateDetails (req, res) {
        try {
            const data = await TalentCertificationDetailsService.deleteTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a  certificate
     *  from talent object certificate array
     * @author Codemonk
     * @since 18/10/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentCertificateDetails (req, res) {
        try {
            const data = await TalentCertificationDetailsService.editTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = TalentCertificationDetailsController;
