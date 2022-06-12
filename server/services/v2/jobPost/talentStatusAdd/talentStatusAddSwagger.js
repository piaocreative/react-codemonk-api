const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/job-post/talent/status'].post = {
        security: [{
            bearerAuth: []
        }],
        tags: [
            'Job Post(v2)'
        ],
        parameters: [
            {
                in: 'formData',
                name: 'jobPostId',
                type: 'string',
                required: true,
                description: 'JobPost id',
                example: '5f056f015f2c8f0007cbae11'
            },
            {
                in: 'formData',
                name: 'talentId',
                type: 'string',
                required: true,
                description: 'Talent userId',
                example: '5f05a1265cd2ae00079ff966'
            },
            {
                in: 'formData',
                name: 'status',
                type: 'number',
                required: true,
                description: 'status',
                example: 5
            },
        ],
        description: 'Add talent to a job brief.',
        summary: 'Add talent to a job brief.',
        responses: {
            200: {
                description: 'Add talent to a job brief.',
                schema: {
                    $ref: '#/definitions/jobPostTalentStatusAddsuccess'
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

    swaggerJson.definitions.jobPostTalentStatusAddsuccess = {
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
