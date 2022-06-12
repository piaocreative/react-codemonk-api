const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/professional-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent'
            ],
            'description': 'Professional details update',
            'summary': 'Professional details update',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/professionalDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Professional details update',
                    'schema': {
                        '$ref': '#/definitions/success'
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

    swaggerJson.definitions.professionalDetails = {
        'type': 'object',
        'properties': {
            'professionalSummary': {
                'type': 'string',
                'example': 'hello this is testing'
            },
            'linkedInUrl': {
                'type': 'string',
                'example': 'https://www.linkedin.com/in/williamhgates'
            },
            'gitHubUrl': {
                'type': 'string',
                'example': 'https://github.com/bill-gates'
            },
            'stackOverFlowUrl': {
                'type': 'string',
                'example': 'https://stackoverflow.com/users/22656/jon-skeet'
            },
            'dribbbleUrl': {
                'type': 'string',
                'example': 'https://dribbble.com/vishalamrutiya'
            },
            'behanceUrl': {
                'type': 'string',
                'example': 'https://www.behance.net/vishalamrutiya'
            },
            'portfolioUrl': {
                'type': 'string',
                'example': 'https://vishalamrutiya.com'
            },
            'primaryRole': {
                'type': 'string',
                'example': 'Developer'
            },
            'yearsOfExperience': {
                'type': 'string',
                'example': 'Beginner - 0 - 2 yrs'
            },
            'skills': {
                'type': 'Array',
                'example': [
                    {
                        'name': 'Node',
                        'rate': 7
                    },
                    {
                        'name': 'NoSQL',
                        'rate': 7
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

    swaggerJson.definitions.success = {
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


