const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/talents'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [{
                in: 'query',
                name: 'page',
                description: 'page number for pagination'
            },
            {
                in: 'query',
                name: 'limit',
                description: 'limit the records for pagination'
            }],
            description: 'client project list',
            summary: 'client project list based on name',
            responses: {
                200: {
                    description: 'Client project list',
                    schema: {
                        $ref: '#/definitions/clientProjectListsuccess'
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

    swaggerJson.definitions.clientProjectListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5f75b9cbe0d2005af182f5f2',
                        currency: 'USD',
                        primaryRole: 'Solution Architect',
                        ratePerHour: 32.5,
                        talentShortName: 'HP',
                        status: 1,
                        talentId: '5f5b99b01e038f0c7ce1691e',
                        projectName: 'CodeMonk',
                        allocationTill: '2020-10-31T00:00:00.000Z'
                    },
                    {
                        _id: '5f75b9cbe0d2005af182f5f2',
                        primaryRole: 'Data Scientist',
                        currency: 'USD',
                        ratePerHour: 130,
                        talentShortName: 'TD',
                        status: 1,
                        talentId: '5f2d3e4eba0dae43224ae38d',
                        projectName: 'CodeMonk',
                        allocationTill: '2020-10-28T00:00:00.000Z'
                    },
                    {
                        _id: '5f631e56d37cbb4801f0fa45',
                        currency: 'EUR',
                        primaryRole: 'Delivery Manager',
                        ratePerHour: 40.72,
                        status: 0,
                        talentId: '5f05e1ceec335829f4dea020',
                        projectName: 'CodeMonk',
                        allocationTill: '2021-12-31T00:00:00.000Z'
                    },
                    {
                        _id: '5f2abf4364712b10ad0e8e3c',
                        currency: 'USD',
                        primaryRole: 'Solution Architect',
                        ratePerHour: 32.5,
                        talentShortName: 'HP',
                        status: 1,
                        talentId: '5f5b99b01e038f0c7ce1691e',
                        projectName: 'CodeMonk',
                        allocationTill: '2020-10-31T00:00:00.000Z'
                    },
                    {
                        _id: '5f2abf4364712b10ad0e8e3c',
                        currency: 'GBP',
                        primaryRole: 'UX Manager',
                        ratePerHour: 87.1,
                        talentShortName: 'TT',
                        status: 1,
                        talentId: '5f57356134ed4c3769525b2c',
                        projectName: 'CodeMonk',
                        allocationTill: '2020-10-24T00:00:00.000Z'
                    }
                    ],
                    totalDocs: 5,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
