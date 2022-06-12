const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/project/talent'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Admin'
            ],
            description: 'Add project by admin',
            summary: 'Add project by admin user',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/addTalentToProjectByAdmin'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Update client user billing details',
                    schema: {
                        $ref: '#/definitions/successAddProject'
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

    swaggerJson.definitions.addTalentToProjectByAdmin = {
        type: 'object',
        properties: {
            projectId: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            },
            talentId: {
                type: 'string',
                example: '5f083c352a7908662c334532'
            },
            startDate: {
                type: 'string',
                example: '01/10/2020'
            },
            endDate: {
                type: 'string',
                example: '31/12/2021'
            }
        }
    };

    swaggerJson.definitions.successAddProject = {
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
