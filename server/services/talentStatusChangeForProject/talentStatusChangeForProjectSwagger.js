const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/project/talent/status'] = {
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
                    $ref: '#/definitions/projectTalentStatusChange'
                }
            }],
            description: 'change status of  details',
            summary: 'change status of  details',
            responses: {
                200: {
                    description: 'change status of  details',
                    schema: {
                        $ref: '#/definitions/projectTalentStatusChangesuccess'
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

    swaggerJson.definitions.projectTalentStatusChange = {
        type: 'object',
        properties: {
            projectId: {
                type: 'string',
                example: 'project Id'
            },
            talentId: {
                type: 'string',
                example: 'talent Id'
            },
            status: {
                type: 'number',
                example: 2
            },
            startDate: {
                type: 'string',
                example: '30/09/2020'
            },
            endDate: {
                type: 'string',
                example: '31/12/2020'
            }
        }
    };

    swaggerJson.definitions.projectTalentStatusChangesuccess = {
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
