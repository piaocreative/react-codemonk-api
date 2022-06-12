const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/roles/count'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Other'
            ],
            parameters: [],
            description: 'Talents role count',
            summary: 'Talents role count',
            responses: {
                200: {
                    description: 'Talents role count',
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

    swaggerJson.definitions.success = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'array',
                example: [
                    {
                        '_id': 'Product Manager',
                        'count': 0
                    },
                    {
                        '_id': 'UX Manager',
                        'count': 3
                    },
                    {
                        '_id': 'Product (UI) designer',
                        'count': 0
                    },
                    {
                        '_id': 'Data Scientist',
                        'count': 1
                    },
                    {
                        '_id': 'Developer',
                        'count': 0
                    },
                    {
                        '_id': 'Quality Analyst',
                        'count': 0
                    },
                    {
                        '_id': 'DevOps engineer',
                        'count': 0
                    },
                    {
                        '_id': 'Solution Architect',
                        'count': 1
                    },
                    {
                        '_id': 'Database Architect',
                        'count': 0
                    },
                    {
                        '_id': 'Delivery Manager',
                        'count': 1
                    },
                    {
                        '_id': 'Project Manager',
                        'count': 0
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
