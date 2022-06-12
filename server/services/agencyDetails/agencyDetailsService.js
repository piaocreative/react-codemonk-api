const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const Utils = require('../../util/utilFunctions');
const Validator = require('../validation');

/**
 * Class represents services for get agency details based on it's id
 */
class AgencyDetailsService {
    /**
     * @desc This function is being used to get agency details based on it's id
     * @author Innovify
     * @since 03/12/2020
     * @param {Object} req Request
     * @param {String} req.params params agency id
     * @param {function} res Response
     * @param {Object} user logged in user data
     */
    static async details (req, local) {
        const Valid = new Validator(local);
        await Valid.checkId(req.params.id);
        const aggregateParams = [
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(req.params.id)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'let': {
                        'talentId': '$userId'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$talentId'
                                    ]
                                }
                            }
                        }, {
                            '$project': {
                                'agencyUserId': '$_id',
                                'countryCode': 1,
                                'phoneNumber': 1,
                                'firstName': 1,
                                'lastName': 1
                            }
                        }
                    ],
                    'as': 'user'
                }
            }, {
                '$replaceRoot': {
                    'newRoot': {
                        '$mergeObjects': [
                            {
                                '$arrayElemAt': [
                                    '$user', 0
                                ]
                            }, '$$ROOT'
                        ]
                    }
                }
            }, {
                '$project': {
                    '_id': 1,
                    'agencyUserId': 1,
                    'firstName': 1,
                    'lastName': 1,
                    'countryCode': 1,
                    'phoneNumber': 1,
                    'designation': 1,
                    'name': '$agency.name',
                    'registeredNumber': '$agency.registeredNumber',
                    'addressLineOne': '$agency.addressLineOne',
                    'addressLineTwo': '$agency.addressLineTwo',
                    'city': '$agency.city',
                    'country': '$agency.country',
                    'postCode': '$agency.postcode',
                    'duns': '$agency.duns',
                    'vatNumber': '$agency.vatNumber',
                    'tradingName': '$trading.name',
                    'tradingWebsite': '$trading.website',
                    'tradingSummary': '$trading.summary',
                    'tradingLogo': '$trading.logo',
                    'tradingAddressLineOne': '$trading.addressLineOne',
                    'tradingAddressLineTwo': '$trading.addressLineTwo',
                    'tradingCity': '$trading.city',
                    'tradingCountry': '$trading.country',
                    'tradingPostCode': '$trading.postcode',
                    status: Utils.getUserStatus()
                }
            }
        ];

        const agency = await Agency.aggregate(aggregateParams);

        if (!agency.length) {
            throw new CodeMonkError(local('INVALID_AGENCY_ID'), 400);
        }

        return agency[0];
    }
}

module.exports = AgencyDetailsService;
