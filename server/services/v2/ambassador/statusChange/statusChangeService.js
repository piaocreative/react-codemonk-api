const mongoose = require('mongoose');
const Ambassador = require('../../../../models/ambassador.model');
const User = require('../../../../models/user.model');
const StatusChangeValidator = require('./statusChangeValidator');

/**
 * Class represents services for ambassador status change
 */
class StatusChangeService {
    /**
     * @desc This function is being used to ambassador status change
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {String} req.body.ambassadorId params ambassador id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, local) {
        const Validator = new StatusChangeValidator(req.body, local);
        await Validator.ambassadorStatusChange();

        await Ambassador.updateOne({
            userId: mongoose.Types.ObjectId(req.body.ambassadorId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });

        await User.updateOne({
            _id: mongoose.Types.ObjectId(req.body.ambassadorId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });
    }
}

module.exports = StatusChangeService;
