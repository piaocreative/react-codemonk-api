const message = require('../../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/ambassador/talent-invite'] = {
        'post': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Ambassador(v2)'
            ],
            'description': 'Invite talent/s',
            'summary': 'Invite talent/s',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/inviteTalentForAmbassador'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Invite talent/s',
                    'schema': {
                        '$ref': '#/definitions/successInviteTalentForAmbassador'
                    }
                },
                400: {
                    'description': 'Invalid request',
                    'schema': {
                        '$ref': '#/definitions/validationError'
                    }
                },
                '401': {
                    'description': 'Unauthorized Access',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                '500': {
                    'description': 'Something went wrong. Try again.',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };
    swaggerJson.paths['/v2/ambassador/client-invite'] = {
        'post': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Ambassador(v2)'
            ],
            'description': 'Invite client/s',
            'summary': 'Invite client/s',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/inviteClientForAmbassador'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Invite client/s',
                    'schema': {
                        '$ref': '#/definitions/successInviteClientForAmbassador'
                    }
                },
                400: {
                    'description': 'Invalid request',
                    'schema': {
                        '$ref': '#/definitions/validationError'
                    }
                },
                '401': {
                    'description': 'Unauthorized Access',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                '500': {
                    'description': 'Something went wrong. Try again.',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
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

    swaggerJson.definitions.inviteTalentForAmbassador = {
        'type': 'object',
        'properties': {
            'emails': {
                type: 'array',
                example: [{
                    name: 'My Friend',
                    email: 'test@yopmail.com'
                },
                {
                    email: 'test@yopmail.com'
                },
                {
                    email:  'talent@mailinator.com'
                }]
            }
        }
    };

    swaggerJson.definitions.inviteClientForAmbassador = {
        'type': 'object',
        'properties': {
            'emails': {
                type: 'array',
                example: [{
                    name: 'My Friend',
                    email: 'test@yopmail.com'
                },
                {
                    email: 'test@yopmail.com'
                },
                {
                    email:  'client@mailinator.com'
                }]
            }
        }
    };

    swaggerJson.definitions.successInviteTalentForAmbassador = {
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

    swaggerJson.definitions.successInviteClientForAmbassador = {
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
