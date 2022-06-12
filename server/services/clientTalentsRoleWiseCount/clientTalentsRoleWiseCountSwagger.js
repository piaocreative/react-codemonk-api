const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/project/team/count'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [],
            description: 'client project team composition count count',
            summary: 'client project team composition count count',
            responses: {
                200: {
                    description: 'Client project team composition count count',
                    schema: {
                        $ref: '#/definitions/clientProjectTalentTeamCountsuccess'
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

    swaggerJson.definitions.clientProjectTalentTeamCountsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'array',
                example: [{
                    value: 2,
                    name: 'Solution Architect'
                },
                {
                    value: 1,
                    name: 'Data Scientist'
                },
                {
                    value: 5,
                    name: 'UX Manager'
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
