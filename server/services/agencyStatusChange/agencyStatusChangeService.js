const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const User = require('../../models/user.model');
const AgencyStatusChangeValidator = require('./agencyStatusChangeValidator');

/**
 * Class represents services for agency status change
 */
class AgencyDetailsService {
    /**
     * @desc This function is being used to agency status change
     * @author Innovify
     * @since 07/12/2020
     * @param {Object} req Request
     * @param {String} req.body.agencyId params agency id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, local) {
        const Validator = new AgencyStatusChangeValidator(req.body, local);
        await Validator.AgencyStatusChange();

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(req.body.agencyId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });

        await User.updateOne({
            _id: mongoose.Types.ObjectId(req.body.agencyId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });
    }
}

module.exports = AgencyDetailsService;
