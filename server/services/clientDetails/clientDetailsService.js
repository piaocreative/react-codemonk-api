const mongoose = require('mongoose');
const Client = require('../../models/client.model');
const Utils = require('../../util/utilFunctions');
const Validator = require('../validation');

/**
 * Class represents services for get client details based on it's id
 */
class ClientDetailsService {
    /**
     * @desc This function is being used to get client details based on it's id
     * @author Innovify
     * @since 26/11/2020
     * @param {Object} req Request
     * @param {String} req.params params client id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details (req, local) {
        const Valid = new Validator( local);
        await Valid.checkId(req.params.id);

        const aggregateParams = [{
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'clientDetails'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        $arrayElemAt: [
                            '$clientDetails', 0
                        ]
                    }, '$$ROOT']
                }
            }
        }, {
            $project: {
                clientUserId: '$userId',
                registerType: 1,
                firstName: 1,
                lastName: 1,
                jobTitle: 1,
                postcode: 1,
                timeZone: 1,
                addressLineOne: 1,
                addressLineTwo: 1,
                city: 1,
                country: 1,
                billing: 1,
                authority: 1,
                pay: 1,
                status: Utils.getUserStatus()
            }
        }];
        const client = await Client.aggregate(aggregateParams);

        if (!client.length) {
            throw new CodeMonkError(local('INVALID_CLIENT_ID'), 400);
        }

        return client[0];
    }
}

module.exports = ClientDetailsService;
