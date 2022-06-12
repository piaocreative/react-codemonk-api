const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/job-post/apply'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post'
            ],
            description: 'Apply job post by talent user',
            summary: 'Apply job post by talent user',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Apply job post by talent user',
                required: true,
                schema: {
                    $ref: '#/definitions/applyJobPost'
                }
            }],
            responses: {
                200: {
                    description: 'Apply job post',
                    schema: {
                        $ref: '#/definitions/applyJobPostSuccess'
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

    swaggerJson.definitions.applyJobPost = {
        type: 'object',
        properties: {
            jobPostId: {
                type: 'string',
                example: '5f97c88aa350e416d1a5ebaa'
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

    swaggerJson.definitions.applyJobPostSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.TALENT_APPLIED_JOB_POST
            }
        }
    };

    return swaggerJson;
};
