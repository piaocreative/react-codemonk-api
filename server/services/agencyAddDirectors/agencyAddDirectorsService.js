const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyDirectorsDetailsValidator = require('./agencyAddDirectorsValidator');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency directors/shareholders details
 */
class AgencyDirectorsDetailsService {

    /**
     * @desc This function is being used to agency directors/shareholders details
     * @author Innovify
     * @since 03/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateDirectorsDetails (req, user, local) {
        const Validator = new AgencyDirectorsDetailsValidator(req.body, local);
        await Validator.validateDirectorDetails();
        const updateData = Utils.prepareDirectorsDataDOB(req.body.directors);

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                directors: updateData,
                signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.DIRECTORS_DETAIL
            }
        });
    }
}

module.exports = AgencyDirectorsDetailsService;
