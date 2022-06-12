const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/certificates'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Update agency certificate edit',
            summary: 'Update agency certificate edit',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Update agency certificate edit',
                required: true,
                schema: {
                    $ref: '#/definitions/agencyCertificateedit'
                }
            }],
            responses: {
                200: {
                    description: 'Update project edit',
                    schema: {
                        $ref: '#/definitions/success'
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

    swaggerJson.definitions.agencyCertificateedit = {
        type: 'object',
        properties: {
            certificates: {
                type: 'array',
                example: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
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

    swaggerJson.definitions.success = {
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
