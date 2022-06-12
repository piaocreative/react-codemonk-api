const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/user/email'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Update user email request',
            summary: 'Update user email request',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/userEmailRequest'
                }
            }],
            responses: {
                200: {
                    description: 'Update user profile email request',
                    schema: {
                        $ref: '#/definitions/successUserEmailRequest'
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

    swaggerJson.definitions.userEmailRequest = {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                example: 'example@example.com'
            }
        }
    };

    swaggerJson.definitions.successUserEmailRequest = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.SUCCESS_EMAIL_CHANGE_REQUEST
            }
        }
    };

    return swaggerJson;
};
