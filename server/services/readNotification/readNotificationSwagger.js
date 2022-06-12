const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/notification/mark-read'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Notification'
            ],
            description: 'Mark notification as read',
            summary: 'Mark notification as read',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/readNotification'
                }
            }],
            responses: {
                200: {
                    description: 'Mark notification as read',
                    schema: {
                        $ref: '#/definitions/successReadNotification'
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

    swaggerJson.definitions.readNotification = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            }
        }
    };

    swaggerJson.definitions.successReadNotification = {
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
