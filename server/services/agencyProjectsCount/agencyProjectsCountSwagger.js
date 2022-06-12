const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/projects/count'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            parameters: [],
            description: 'Agency projects count',
            summary: 'Agency projects count',
            responses: {
                200: {
                    description: 'Agency projects count',
                    schema: {
                        $ref: '#/definitions/agencyProjectsCountsuccess'
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

    swaggerJson.definitions.agencyProjectsCountsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'number',
                example: 38
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
