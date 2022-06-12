const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/recruiter/job-post/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Recruiter - Job Post(v2)'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'id of job post'
            }],
            description: 'Get job post details',
            summary: 'Get job post details',
            responses: {
                200: {
                    description: 'Get job post details',
                    schema: {
                        $ref: '#/definitions/jobPostDetailsuccess'
                    }
                },
                400: {
                    description: message.INVALID_BRIEF_REQUEST,
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
                example: message.INVALID_BRIEF_REQUEST
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

    swaggerJson.definitions.jobPostDetailsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    _id: '5f97c88aa350e416d1a5ebaa',
                    name: 'Test',
                    description: 'This is test',
                    budget: '$50k-$150k',
                    skills: [
                        'web-development'
                    ],
                    workPreference: [
                        'parttime-weekdays-am',
                        'parttime-weekdays-pm'
                    ],
                    teamPreference: [
                        'small-team'
                    ],
                    assignments: [
                        'remote-only'
                    ],
                    status: 1,
                    updatedAt: '2020-10-27T10:36:07.714Z'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
