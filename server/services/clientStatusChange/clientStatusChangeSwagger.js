const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change client status of the client',
                required: true,
                schema: {
                    $ref: '#/definitions/clientStatusChange'
                }
            }],
            description: 'Change status of client',
            summary: 'Change status of client',
            responses: {
                200: {
                    description: 'Change status of client',
                    schema: {
                        $ref: '#/definitions/clientStatusChangeSuccess'
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

    swaggerJson.definitions.clientStatusChange = {
        type: 'object',
        properties: {
            clientId: {
                type: 'string',
                example: 'clientId'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.clientStatusChangeSuccess = {
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
