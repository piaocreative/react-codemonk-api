const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/job-post/preferred-candidates'].put = {
        security: [{
            bearerAuth: []
        }],
        tags: [
            'Job Post(v2)'
        ],
        description: 'Edit job-post by client',
        summary: 'Edit job-post by client user (Step 2)',
        parameters: [
            {
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editJobPostPreferredCandidates'
                }
            }
        ],
        responses: {
            200: {
                description: 'Job brief is published by Admin/Client',
                schema: {
                    $ref: '#/definitions/successEditJobPostPreferredCandidates'
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

    swaggerJson.definitions.editJobPostPreferredCandidates = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '60d1e5a0f97dc062965b807f'
            },
            hardSkills: {
                type: 'array',
                example: ['Angular']
            },
            softSkills: {
                type: 'array',
                example: ['Excel', 'Docs']
            },
            certifications: {
                type: 'array',
                example: ['ADOBE CERTIFIED ASSOCIATE (ACA)']
            },
            industry: {
                type: 'string',
                example: 'Accounting'
            },
            teamWorking: {
                type: 'string',
                example: 'Team Player'
            },
            discProfile: {
                type: 'string',
                example: 'D - Style'
            },
            languages: {
                type: 'array',
                example: ['English']
            }
        }
    };

    swaggerJson.definitions.successEditJobPostPreferredCandidates = {
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
