const mongoose = require('mongoose');
const Recruiter = require('../../../../models/recruiter.model');
const Utils = require('../../../../util/utilFunctions');
const Validator = require('../../../validation');

/**
 * Class represents services for get recruiter details based on it's id
 */
class RecruiterDetailsService {
    /**
     * @desc This function is being used to get recruiter details based on it's id
     * @author CodeMonk
     * @since 15/02/2022
     * @param {Object} req Request
     * @param {String} req.params params recruiter id
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
                as: 'recruiterDetails'
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        $arrayElemAt: [
                            '$recruiterDetails', 0
                        ]
                    }, '$$ROOT']
                }
            }
        }, {
            $project: {
                recruiterUserId: '$userId',
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
                status: Utils.getUserStatusForRecruiter()
            }
        }];
        const recruiter = await Recruiter.aggregate(aggregateParams);

        if (!recruiter.length) {
            throw new CodeMonkError(local('INVALID_RECRUITER_ID'), 400);
        }

        return recruiter[0];
    }
}

module.exports = RecruiterDetailsService;
