const message = require('../../../locales/en');
const parameters = [ {
    in: 'query',
    name: 'sort',
    description: { name: 1 },
    default: 'name',
    type: 'string',
    enum: ['_id', '-_id', 'email', '-email', 'referrer.firstName,referrer.lastName',
        '-referrer.firstName,-referrer.lastName',
        'referee.firstName,referee.lastName', '-referee.firstName,-referee.lastName',
        'status', '-status', 'referredOn', '-referredOn', 'daysOfRefereeActivated', '-daysOfRefereeActivated',
        'daysOfRefereeVerified', '-daysOfRefereeVerified', 'daysOfRefereeHired', '-daysOfRefereeHired'
    ]
},
{
    in: 'query',
    name: 'limit',
    description: 'limit for result set'
},
{
    in: 'query',
    name: 'page',
    description: 'page of result set'
},
{
    in: 'query',
    name: 'referrerUserId',
    type: 'string',
    description: 'Get referrer user id filter'
}];

const listStatus = [{
    in: 'query',
    name: 'status',
    type: 'array',
    items: {
        enum: [10, 20, 30, 40, 50]
    },
    description: `Filter for referee status
    10 = 'Invited', 20 = 'Registered', 30 = 'Active', 40 = 'Verified', 50 = 'Hired'`
}];

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/referral/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Referral(v2)'
            ],
            parameters: [].concat(parameters, listStatus),
            description: 'referral list',
            summary: 'referral list',
            responses: {
                200: {
                    description: 'referral list',
                    schema: {
                        $ref: '#/definitions/referralListSuccess'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ERROR_MSG
            }
        }
    };

    swaggerJson.definitions.validationError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.INVALID_REQUEST
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccess = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ACCESS_DENIED
            }
        }
    };

    swaggerJson.definitions.referralListSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    'docs': [{
                        '_id': '61f96edb713bbfd52fd1e4d3',
                        'refereeEmailId': 'ainvite6@yopmail.com',
                        'referrerUserId': '61ee66bccace962657901a76',
                        'referredOn': '2022-02-01T17:33:15.173Z',
                        'status': 1,
                        'refereeUserId': '61f96f1ad9c606b9675500e3'
                    },
                    {
                        '_id': '61f7ffad713bbfd52fb6add7',
                        'refereeEmailId': 'invite92@yopmail.com',
                        'referrerUserId': '5f099281d1005e0007f9f0bd',
                        'referredOn': '2022-01-31T15:26:37.614Z',
                        'status': 1,
                        'refereeUserId': '61f7ffd744c670e052e4765a'
                    },
                    {
                        '_id': '61f7fc95713bbfd52fb67076',
                        'refereeEmailId': 'invite2@yopmail.com',
                        'referrerUserId': '5f099281d1005e0007f9f0bd',
                        'refereeUserId': '61f7fc952f14722d5a8d1716',
                        'status': 1
                    },
                    {
                        '_id': '61f96b2d713bbfd52fd19c6b',
                        'refereeEmailId': 'ainvite3@yopmail.com',
                        'referrerUserId': '61ee66bccace962657901a76',
                        'referredOn': '2022-02-01T17:17:33.464Z',
                        'status': 1,
                        'refereeUserId': '61f96e911570ae85b319609a'
                    },
                    {
                        '_id': '61f8078a713bbfd52fb74839',
                        'refereeEmailId': 'invite101@yopmail.com',
                        'referrerUserId': '5f099281d1005e0007f9f0bd',
                        'referredOn': '2022-01-31T16:00:10.354Z',
                        'status': 1,
                        'refereeUserId': '61f807a837300c2d62878d78'
                    }
                    ],
                    totalDocs: 111,
                    limit: 20,
                    page: 1,
                    totalPages: 6,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
