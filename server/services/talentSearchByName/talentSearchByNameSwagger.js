const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/by-name'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Admin'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'query for name search of talent',
                required: true
            }],
            description: 'search talent',
            summary: 'search talent',
            responses: {
                200: {
                    description: 'Talent search by name list',
                    schema: {
                        $ref: '#/definitions/talentSearhcNameSuccess'
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

    swaggerJson.definitions.talentSearhcNameSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'array',
                example: [{
                    _id: '5f05e1ceec335829f4dea020',
                    name: 'Talent Last'
                },
                {
                    _id: '5f524931452e5002a19a9430',
                    name: 'Talent One Talent Last One'
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
