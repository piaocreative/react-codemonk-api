const mongoose = require('mongoose');
const Client = require('../../models/client.model');
const User = require('../../models/user.model');
const ClientStatusChangeValidator = require('./clientStatusChangeValidator');

/**
 * Class represents services for client status change
 */
class ClientDetailsService {
    /**
     * @desc This function is being used to client status change
     * @author Innovify
     * @since 13/11/2020
     * @param {Object} req Request
     * @param {String} req.body.clientId params client id
     * @param {Number} req.body.status status that needs to be change
     */
    static async changeStatus (req, local) {
        const Validator = new ClientStatusChangeValidator(req.body, local);
        await Validator.ClientStatusChange();

        await Client.updateOne({
            userId: mongoose.Types.ObjectId(req.body.clientId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });

        await User.updateOne({
            _id: mongoose.Types.ObjectId(req.body.clientId)
        }, {
            $set: {
                isActive: req.body.status
            }
        });
    }
}

module.exports = ClientDetailsService;
