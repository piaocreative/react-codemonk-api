const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change talent status',
                required: true,
                schema: {
                    $ref: '#/definitions/talentStatusChange'
                }
            }],
            description: 'Change status of talent',
            summary: 'Change status of talent',
            responses: {
                200: {
                    description: 'Change status of talent',
                    schema: {
                        $ref: '#/definitions/talentStatusChangeSuccess'
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

    swaggerJson.definitions.talentStatusChange = {
        type: 'object',
        properties: {
            talentId: {
                type: 'string',
                example: 'talentId'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.talentStatusChangeSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
