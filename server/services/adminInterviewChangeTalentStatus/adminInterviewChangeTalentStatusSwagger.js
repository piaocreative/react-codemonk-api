const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/admin/interview/talent/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Admin'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/changeTalentInterviewStatus'
                }
            }],
            description: 'Admin change interview status',
            summary: 'Admin change interview status. Status value can be 0 = Rejected, 1 = Hire',
            responses: {
                200: {
                    description: 'Admin change interview sucess',
                    schema: {
                        $ref: '#/definitions/changeTalentInterviewStatusSuccess'
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

    swaggerJson.definitions.changeTalentInterviewStatus = {
        type: 'object',
        properties: {
            interviewId: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            },
            status: {
                type: 'number',
                example: 1
            }
        }
    };

    swaggerJson.definitions.changeTalentInterviewStatusSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    'n': 0,
                    'nModified': 0,
                    'ok': 1
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
