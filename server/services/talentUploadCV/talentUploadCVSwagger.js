const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/cv'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            parameters: [{
                in: 'formData',
                name: 'talentCV',
                type: 'file',
                description: 'Upload talent CV'
            }],
            description: 'Uplod talent CV',
            summary: 'Uplod talent CV',
            responses: {
                200: {
                    description: 'Uplod talent CV',
                    schema: {
                        $ref: '#/definitions/uploadTalentSuccess'
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

    swaggerJson.definitions.uploadTalentSuccess = {
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
