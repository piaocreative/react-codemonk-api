const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/save-later'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
            ],
            'description': 'save later details',
            'summary': 'save later details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/saveLater'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Save later Api Details',
                    'schema': {
                        '$ref': '#/definitions/successDetails'
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

    swaggerJson.definitions.saveLater = {
        'type': 'object',
        'properties': {
            'step': {
                'type': 'number',
                'example': 1
            },
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
                }]
            },
            'timeZone': {
                'type': 'string',
                'example': 'Asia/Kolkata'
            }
        }
    };

    swaggerJson.definitions.successDetails = {
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
