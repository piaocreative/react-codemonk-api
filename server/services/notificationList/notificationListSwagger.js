const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/notification/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Notification'
            ],
            parameters: [
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
            description: 'notification list',
            summary: 'notification list',
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
                        _id: '5f2abf4364712b10ad0e8e3c',
                        name: 'CodeMonk',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f2ac7797a0f5e1ad5e94381',
                        name: 'CodeMonk',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f2ac7bbd929631bba774adc',
                        name: 'CodeMonk',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f3a30217cccde1fcfd48fbe',
                        name: 'codemonk',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f4512eb9596e5710ed1b899',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f4513009596e5710ed1b89a',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f45131245a1c073cb29e0c2',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f451333db003973fe961ef9',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f4513638fa36174304c78d0',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    },
                    {
                        _id: '5f45137a09767674551b1705',
                        name: 'Test',
                        notificationName: 'Client\'sFirst Client\'s Last',
                        companyName: 'Client\'sFirst Client\'s Last',
                        status: 'Requested'
                    }],
                    totalDocs: 80,
                    limit: 10,
                    page: 1,
                    totalPages: 8,
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
