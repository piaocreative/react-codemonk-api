const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/user/email/resend-otp'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Resend user email request otp',
            summary: 'Resend user email request otp',
            parameters: [],
            responses: {
                200: {
                    description: 'Resend user profile email request',
                    schema: {
                        $ref: '#/definitions/successResendUserEmailRequestOTP'
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

    swaggerJson.definitions.successResendUserEmailRequestOTP = {
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
