const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/preference-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
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
            'industries':{
                'type': 'array',
                'example': ['Accounting']
            },
            'companyCultures':{
                'type': 'array',
                'example': ['Quality','Trust']
            },
            'companyType':{
                'type': 'array',
                'example': ['start-up']
            },
            'preferredProjectDuration':{
                'type': 'array',
                'example': ['short-term']
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
