const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/admin/kpis'] = {
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
                    name: 'time',
                    enum: ['all', 'today', 'week', 'month'],
                    description: 'User type filter'
                }
            ],
            description: 'admin KPIs',
            summary: 'admin KPIs',
            responses: {
                200: {
                    description: 'Kpis result',
                    schema: {
                        $ref: '#/definitions/adminKpisSuccess'
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

    swaggerJson.definitions.adminKpisSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    'agencies': 1,
                    'activeAgencies': 1,
                    'talents': 12,
                    'activeTalents': 9,
                    'clients': 4,
                    'activeClients': 4,
                    'briefs': 25,
                    'projects': 10,
                    'interviews': 2,
                    'qoutes': 7,
                    'newBriefs': 8,
                    'newProjects': 4,
                    'newInterviews': 1,
                    'newQuote': 3,
                    'isNewNotification': 3
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
