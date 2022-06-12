
const SignUpService = require('./signUpService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for signup.
 */
class SignUpController {
    /**
     * @desc This function is being used to signUp talent
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async signUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.TALENT;
            const data = await SignUpService.signUp(req, res.__);
            Utils.sendResponse(null, data, res, res.__('REGISTER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to verify talent account
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} req.body.token token
     * @param {Object} res Response
     */
    static async verifyAccount (req, res) {
        try {
            const data = await SignUpService.verifyAccount(req, res.__);
            Utils.sendResponse(null, data, res, res.__('USER_VERIFY_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to resendOTP to talent user
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} res Response
     */
    static async resendOTP (req, res) {
        try {
            const data = await SignUpService.resentOTP(req, res.__);
            Utils.sendResponse(null, data, res, res.__('REGISTER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to signUp client user
     * @author Innovify
     * @since 06/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async clientSignUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.CLIENT;
            const data = await SignUpService.signUp(req, res.__);
            Utils.sendResponse(null, data, res, res.__('REGISTER_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to get agency talent email from token id
     * @author Innovify
     * @since 08/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.token token is nothing but user id
     * @param {Object} res Response
     */
    static async getEmailFromToken (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.CLIENT;
            const data = await SignUpService.getEmailFromToken(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to signUp agency talent user upon invite
     * @author Innovify
     * @since 08/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.token token is nothing but user id
     * @param {Object} res Response
     */
    static async agencyTalentSignUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.CLIENT;
            const data = await SignUpService.agencyTalentSignUp(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = SignUpController;
