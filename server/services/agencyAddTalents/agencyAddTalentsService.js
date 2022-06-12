const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');

/**
 * Class represents services for agency profile save
 */
class AgencyAddTalentsService {

    /**
     * @desc This function is being used to agency add talents
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalents(req, user) {
        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.TALENT_DETAIL
            }
        });
    }
}

module.exports = AgencyAddTalentsService;
