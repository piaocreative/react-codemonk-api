const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/project/talents/count'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [],
            description: 'client project talents count',
            summary: 'client project talents count',
            responses: {
                200: {
                    description: 'Client project talents count',
                    schema: {
                        $ref: '#/definitions/clientProjectTalentCountsuccess'
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

    swaggerJson.definitions.clientProjectTalentCountsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'number',
                example: 225
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
