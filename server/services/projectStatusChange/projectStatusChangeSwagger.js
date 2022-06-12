const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/project/status'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Project'
            ],
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Change project status of the project',
                required: true,
                schema: {
                    $ref: '#/definitions/projectStatusChange'
                }
            }],
            description: 'change status of project',
            summary: 'change status of project',
            responses: {
                200: {
                    description: 'change status of project',
                    schema: {
                        $ref: '#/definitions/projectStatusChangeSuccess'
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

    swaggerJson.definitions.projectStatusChange = {
        type: 'object',
        properties: {
            projectId: {
                type: 'string',
                example: 'project Id'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.projectStatusChangeSuccess = {
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
