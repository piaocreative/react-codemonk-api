const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/job-post/talent/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post(v2)'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change talent status of the job brief',
                required: true,
                schema: {
                    $ref: '#/definitions/jobPostTalentStatusChange'
                }
            }],
            description: 'change status of  details',
            summary: 'change status of  details',
            responses: {
                200: {
                    description: 'change status of  details',
                    schema: {
                        $ref: '#/definitions/jobPostTalentStatusChangesuccess'
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

    swaggerJson.definitions.jobPostTalentStatusChange = {
        type: 'object',
        properties: {
            jobPostId: {
                type: 'string',
                example: 'jobPost Id'
            },
            talentId: {
                type: 'string',
                example: 'talent Id'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.jobPostTalentStatusChangesuccess = {
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
