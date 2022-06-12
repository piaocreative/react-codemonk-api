
const ClientProfileService = require('./clientProfileService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for client profile.
 */
class ClientProfileController {

    /**
     * @desc This function is being used to save client phone number and send OTP SMS
     * @author Innovify
     * @since 06/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.countrycode county code
     * @param {String} req.body.phone phone number
     * @param {Object} res Response
     */
    static async saveClientPhoneNumber (req, res) {
        try {
            const data = await ClientProfileService.saveClientPhoneNumber(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS_PHONE_NUMBER'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to verify client phone number with OTP
     * @author Innovify
     * @since 07/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.otp otp code
     * @param {Object} res Response
     */
    static async verifyClientPhoneNumber (req, res) {
        try {
            const data = await ClientProfileService.verifyClientPhoneNumber(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('CLIENt_VERIFY_PHONE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to update client profile
     * @author Innovify
     * @since 08/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateClientProfile (req, res) {
        try {
            const data = await ClientProfileService.updateClientProfile(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('CLIENT_PROFILE_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to update client about you
     * @author Innovify
     * @since 09/12/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
     static async updateClientAboutYou (req, res) {
        try {
            const data = await ClientProfileService.updateClientAboutYou(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
    /**
     * 
     * @since 09/12/2021
     * @param {Object} req  Request
     * @param {Object} req.body RequestBody
     * @param {Object} res  Response
     */
    static async updateClientAboutCompany (req, res) {
        try {
            const data = await ClientProfileService.updateClientAboutCompany(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to update client about you
     * @author Innovify
     * @since 09/12/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
     static async updateClientCompanyLocation (req, res) {
        try {
            const data = await ClientProfileService.updateClientCompanyLocation(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async updateClientCompanyLocationEdit (req, res) {
        try {
            const data = await ClientProfileService.updateClientCompanyLocationEdit(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async deleteClientCompanyLocation (req, res) {
        try {
            const data = await ClientProfileService.deleteClientCompanyLocation(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to update client profile partial save-Later
     * @author CodeMonk
     * @since 15/12/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateClientProfileSaveLater (req, res) {
        try {
            const data = await ClientProfileService.updateClientSaveLater(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, 'The data is saved successfully.');
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ClientProfileController;
