const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/ambassador/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Ambassador(v2)'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change ambassador status of the ambassador',
                required: true,
                schema: {
                    $ref: '#/definitions/ambassadorStatusChange'
                }
            }],
            description: 'Change status of ambassador',
            summary: 'Change status of ambassador',
            responses: {
                200: {
                    description: 'Change status of ambassador',
                    schema: {
                        $ref: '#/definitions/ambassadorStatusChangeSuccess'
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

    swaggerJson.definitions.ambassadorStatusChange = {
        type: 'object',
        properties: {
            ambassadorId: {
                type: 'string',
                example: 'ambassadorId'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.ambassadorStatusChangeSuccess = {
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
