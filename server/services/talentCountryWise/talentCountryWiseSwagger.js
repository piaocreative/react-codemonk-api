const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/country/count'] = {
        get: {
            tags: [
                'Other'
            ],
            description: 'Country wise talent count',
            summary: 'Country wise talent count',
            responses: {
                200: {
                    description: 'Country wise talent count',
                    schema: {
                        $ref: '#/definitions/countryWiseCountSuccess'
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
    swaggerJson.definitions.countryWiseCountSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            }, data: {
                type: 'array',
                example: [
                    {
                        '_id': 'India',
                        'count': 2
                    },
                    {
                        '_id': 'UK',
                        'count': 3
                    }
                ]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
