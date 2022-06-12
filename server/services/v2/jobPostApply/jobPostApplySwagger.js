const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/job-post/apply'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post(v2)'
            ],
            description: 'Apply job post by talent user',
            summary: 'Apply job post by talent user',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Apply job post by talent user',
                required: true,
                schema: {
                    $ref: '#/definitions/applyJobPostV2'
                }
            }],
            responses: {
                200: {
                    description: 'Apply job post',
                    schema: {
                        $ref: '#/definitions/applyJobPostSuccessV2'
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

    swaggerJson.definitions.applyJobPostV2 = {
        type: 'object',
        properties: {
            jobPostId: {
                type: 'string',
                example: '5f97c88aa350e416d1a5ebaa'
            },
            notesOfMotivation: {
                type: 'string',
                example: 'The eligible candidate for the job brief.'
            },
            availableJoiningDate: {
                type: 'string',
                example: '01/12/2021'
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

    swaggerJson.definitions.applyJobPostSuccessV2 = {
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
