const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/by-name'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Admin'
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'q',
                    description: 'query for name search of client'
                }, {
                    in: 'query',
                    name: 'companyName',
                    description: 'query for company name search of client'
                } ],
            description: 'search client',
            summary: 'search client',
            responses: {
                200: {
                    description: 'Update project details',
                    schema: {
                        $ref: '#/definitions/clientSearhcNameSuccess'
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

    swaggerJson.definitions.clientSearhcNameSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'array',
                example: [{
                    _id: '5f5741aae76b0a4ca72d8e2c',
                    name: 'Hitesh Parikh',
                    companyName: 'Parkh'
                },
                {
                    _id: '5f4611c8571084334e86fd68',
                    name: 'Hitesh1 Parikh1',
                    companyName: 'Parkh'
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
