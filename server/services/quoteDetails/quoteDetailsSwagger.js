const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/quote/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Quote'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'Id of quote'
            }],
            description: 'Get quote details',
            summary: 'Get quote details',
            responses: {
                200: {
                    description: 'Get quote details',
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
                    _id: '5fa53342be9c067b2295af22',
                    projectId: '5f2ac7797a0f5e1ad5e94381',
                    name: 'New one',
                    description: 'dfdsfjdsfkl ds fdskjf dsk jfkdsjf kdsjkfdskf dskjfkdsfkjds flkds jfds f',
                    quoteUrl: 'QUOTE DOWNLOADABLE URL',
                    isApplied: false
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
