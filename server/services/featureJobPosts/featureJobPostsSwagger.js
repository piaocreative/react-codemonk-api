const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/job-post/feature'] = {
        get: {
            tags: [
                'Other'
            ], parameters: [{
                in: 'query',
                name: 'limit',
                description: 'limit for featured jobs',
                default: 12
            }],
            description: 'talent feature jobs list',
            summary: 'talent feature jobs list',
            responses: {
                200: {
                    description: 'talent feature jobs list',
                    schema: {
                        $ref: '#/definitions/featureJobPostssuccess'
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
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ERROR_MSG
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

    swaggerJson.definitions.featureJobPostssuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
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
                        isApplied: true
                    }]
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
