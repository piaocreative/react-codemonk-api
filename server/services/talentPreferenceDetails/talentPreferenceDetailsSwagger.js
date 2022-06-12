const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/preference-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent'
            ],
            'description': 'Update preference details',
            'summary': 'Update preference details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/preferenceDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update preference details',
                    'schema': {
                        '$ref': '#/definitions/successPreferenceDetails'
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

    swaggerJson.definitions.preferenceDetails = {
        'type': 'object',
        'properties': {
            'teamPreference': {
                'type': 'Array',
                'example': ['individuals']
            },
            'assignments': {
                'type': 'Array',
                'example': ['occational-site-visit']
            },
            'workPreference': {
                'type': 'array',
                'example': ['fulltime']
            },
            'availability': {
                'type': 'boolean',
                'example': true
            },
            'unavailability': {
                'type': 'Array',
                'example': [
                    {
                        'date': '2020-04-06T05:16:08.717Z',
                        'key': 'full'
                    },
                    {
                        'date': '2020-04-07T05:16:08.717Z',
                        'key': 'first'
                    },
                    {
                        'date': '2020-04-08T05:16:08.717Z',
                        'key': 'second'
                    }
                ]
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

    swaggerJson.definitions.successPreferenceDetails = {
        'type': 'object',
        'properties': {
            'status': {
                'type': 'boolean',
                'example': true
            },
            'message': {
                'example': message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
