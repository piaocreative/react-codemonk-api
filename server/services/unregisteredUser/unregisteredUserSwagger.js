const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/auth/unregistered-user'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Authentication'
            ],
            parameters: [{
                in: 'query',
                name: 'email',
                description: 'query for email search of talent',
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
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
