const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/recruiter/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Recruiter(v2)'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change recruiter status of the recruiter',
                required: true,
                schema: {
                    $ref: '#/definitions/recruiterStatusChange'
                }
            }],
            description: 'Change status of recruiter',
            summary: 'Change status of recruiter',
            responses: {
                200: {
                    description: 'Change status of recruiter',
                    schema: {
                        $ref: '#/definitions/recruiterStatusChangeSuccess'
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

    swaggerJson.definitions.recruiterStatusChange = {
        type: 'object',
        properties: {
            recruiterId: {
                type: 'string',
                example: 'recruiterId'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.recruiterStatusChangeSuccess = {
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
