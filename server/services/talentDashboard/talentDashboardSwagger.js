const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/invite'] = {
        'post': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent'
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
                        '$ref': '#/definitions/inviteTalent'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Invite talent/s',
                    'schema': {
                        '$ref': '#/definitions/successInviteTalent'
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

    swaggerJson.definitions.inviteTalent = {
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

    swaggerJson.definitions.successInviteTalent = {
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
