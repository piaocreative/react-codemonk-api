const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/about-you'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
            ],
            'description': 'Talent Personal details update',
            'summary': 'Talent Personal details update',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/aboutYou'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Talent Personal details update',
                    'schema': {
                        '$ref': '#/definitions/successPersonalData'
                    }
                },
                '400': {
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

    swaggerJson.definitions.aboutYou = {
        'type': 'object',
        'properties': {
            'firstName': {
                'type': 'string',
                'example': 'Talent'
            },
            'lastName': {
                'type': 'string',
                'example': 'Last'
            },
            'countryCode': {
                'type': 'string',
                'example': '91'
            },
            'phoneNumber': {
                'type': 'string',
                'example': '9925061220'
            },
            'dob': {
                'type': 'string',
                'example': '31/08/1986'
            },
            'gender': {
                'type': 'string',
                'example': 'Male'
            },
            'postcode': {
                'type': 'string',
                'example': '380015'
            },
            'addressLineOne': {
                'type': 'string',
                'example': 'Some House, Some Buildding'
            },
            'addressLineTwo': {
                'type': 'string',
                'example': 'Some Road, Somewhere'
            },
            'city': {
                'type': 'string',
                'example': 'Ahmedabad'
            },
            'country': {
                'type': 'string',
                'example': 'India'
            },
            'language': {
                'type': 'Array',
                'example': [{
                    'name': 'en',
                    'rate': 8
                },
                {
                    'name': 'fr',
                    'rate': 5
                }]
            },
            'timeZone': {
                'type': 'string',
                'example': 'Asia/Kolkata'
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
            }
        }
    };

    swaggerJson.definitions.successPersonalData = {
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
