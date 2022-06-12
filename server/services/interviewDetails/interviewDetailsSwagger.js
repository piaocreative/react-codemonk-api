const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/interview/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Interview'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'id of interview'
            }],
            description: 'interview details',
            summary: 'interview details based on query',
            responses: {
                200: {
                    description: 'interview details',
                    schema: {
                        $ref: '#/definitions/interviewDetailssuccess'
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

    swaggerJson.definitions.interviewDetailssuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    clientName: 'client\'sFirst admin\'s Last',
                    clientEmail: 'client@mailinator.com',
                    talentName: 'Hitesh Parikh',
                    talentEmail: 'talent@mailinator.com',
                    _id: '5f800bbea061a724fda3af9b',
                    dateRequested: '2020-10-09T07:05:34.000Z',
                    adminId: '5f05c940aff1590c69b00906',
                    talentId: '5f5b99b01e038f0c7ce1691f',
                    name: 'Engage Bay',
                    timeSlots: [
                        {
                            isAccepted: 0,
                            _id: '5f800bbea061a724fda3af9c',
                            requestedSlot: '2020-10-13T07:30:00.000Z'
                        }
                    ],
                    status: 'Requested'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
