const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/workexperience-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
            ],
            'description': 'Update work Experience details',
            'summary': 'Update work Experience details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/workExperienceDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update preference details',
                    'schema': {
                        '$ref': '#/definitions/successWorkExperienceDetails'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
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


    swaggerJson.definitions.workExperienceDetails = {
        'type': 'object',
        'properties': {
            'workExperience': {
                'type': 'array',
                'example': [{
                    jobTitle: 'Software Engineer',
                    employmentType: 'Fulltime',
                    employer: 'codemonk',
                    country: 'India',
                    startDate: '14/06/2019',
                    endDate: '14/06/2020',
                    shortDescription: 'I was software developer',
                    isPresent: false
                }]
            }
        }
    };

    swaggerJson.definitions.errorBadRequest = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.INVALID_REQUEST
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        'properties': {
            'status': {
                'type': 'boolean',
                'example': false
            },
            'message': {
                'example': message.ERROR_MSG
            }
        }
    };

    swaggerJson.definitions.successWorkExperienceDetails = {
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

    swaggerJson.definitions.unauthorisedAccess = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ACCESS_DENIED
            }
        }
    };

    return swaggerJson;
};
