const mongoose = require('mongoose');
const Ambassador = require('../../../../models/ambassador.model');
const Utils = require('../../../../util/utilFunctions');
const Validator = require('../../../validation');

/**
 * Class represents services for get ambassador details based on it's id
 */
class DetailsService {
    /**
     * @desc This function is being used to get ambassador details based on it's id
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {String} req.params params ambassador id
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
                as: 'ambassadorDetails'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        $arrayElemAt: [
                            '$ambassadorDetails', 0
                        ]
                    }, '$$ROOT']
                }
            }
        }, {
            $project: {
                ambassadorUserId: '$userId',
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
                status: Utils.getUserStatusForAmbassador()
            }
        }];
        const ambassador = await Ambassador.aggregate(aggregateParams);

        if (!ambassador.length) {
            throw new CodeMonkError(local('INVALID_AMBASSADOR_ID'), 400);
        }

        return ambassador[0];
    }
}

module.exports = DetailsService;
