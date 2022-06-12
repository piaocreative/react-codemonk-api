
const RecruiterDetailsService = require('./recruiterDetailsService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for recruiter details based on it's id
 */
class RecruiterDetailsController {

    /**
     * @desc This function is being used to get recruiter details based on it's id
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async details (req, res) {
        try {
            const data = await RecruiterDetailsService.details(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = RecruiterDetailsController;
