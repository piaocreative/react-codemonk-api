const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/talent/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'query for name search of my team'
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
            }],
            description: 'client list',
            summary: 'client list',
            responses: {
                200: {
                    description: 'Client list',
                    schema: {
                        $ref: '#/definitions/projectListsuccess'
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
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ERROR_MSG
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

    swaggerJson.definitions.projectListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5f7455f2d072fd4e65f0a4aa',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c8',
                        email: '6abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 205,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7455f2d072fd4e65f0a4a9',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c7',
                        email: '5abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 204,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7455f2d072fd4e65f0a4a8',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c6',
                        email: '4abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 203,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7455f2d072fd4e65f0a4a7',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c5',
                        email: '3abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 202,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7455f2d072fd4e65f0a4a6',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c4',
                        email: '2abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 201,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7455f2d072fd4e65f0a4a5',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7455f2d072fd4e65f0a4c3',
                        email: '1abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 200,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f7454d8d072fd4e65f0a485',
                        workPreference: [],
                        currency: 'USD',
                        unavailability: [],
                        talentId: '5f7454d8d072fd4e65f0a486',
                        email: 'abc@mailinator.com',
                        firstName: 'AB',
                        lastName: 'XYZ',
                        rate: 200,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f524931452e5002a19a9430',
                        currency: 'GBP',
                        unavailability: [{
                            _id: '5fad4788ce8ded0379e190e4',
                            date: '2020-11-13T06:30:00.000Z',
                            key: 'full'
                        }],
                        availability: true,
                        workPreference: ['fulltime'],
                        talentId: '5f524931452e5002a19a9431',
                        email: 'talent1@mailinator.com',
                        firstName: 'Some',
                        lastName: 'Parikh',
                        rate: 200,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: true
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: true
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: true
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: true
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f52479382fdb57f10d39c49',
                        currency: 'EUR',
                        unavailability: [],
                        talentId: '5f52479382fdb57f10d39c4c',
                        email: 'talent3@mailinator.com',
                        firstName: 'Talent Three',
                        lastName: 'Talent Last Three',
                        rate: 50,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }, {
                        _id: '5f52479382fdb57f10d39c48',
                        currency: 'GBP',
                        unavailability: [],
                        talentId: '5f52479382fdb57f10d39c4b',
                        email: 'talent2@mailinator.com',
                        firstName: 'Talent Two',
                        lastName: 'Talent Last Two',
                        rate: 25,
                        weekylyAvailability: [{
                            date: '2020-11-07T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-08T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-09T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-10T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-11T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-12T18:30:00.000Z',
                            availability: false
                        },
                        {
                            date: '2020-11-13T18:30:00.000Z',
                            availability: false
                        }]
                    }],
                    totalDocs: 70,
                    limit: 10,
                    page: 7,
                    totalPages: 7,
                    pagingCounter: 61,
                    hasPrevPage: true,
                    hasNextPage: false,
                    prevPage: 6
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
