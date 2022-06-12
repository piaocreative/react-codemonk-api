const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'Id of agency'
            }],
            description: 'Get agency details',
            summary: 'Get agency details',
            responses: {
                200: {
                    description: 'Get agency details',
                    schema: {
                        $ref: '#/definitions/agencyDetailsuccess'
                    }
                },
                400: {
                    description: message.INVALID_BRIEF_REQUEST,
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
                example: message.INVALID_BRIEF_REQUEST
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

    swaggerJson.definitions.agencyDetailsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    '_id': '5f475a54e21d7adea6a0370c',
                    'countryCode': '91',
                    'phoneNumber': '9925061220',
                    'agencyUserId': '5f4754eb3fc8842306a8220d',
                    'name': 'Agency Name',
                    'designation': 'CTO',
                    'registeredNumber': 'NEW REGISTER NUMBER',
                    'addressLineOne': 'My Addrees one',
                    'addressLineTwo': 'My address two',
                    'city': 'Ahmedabad',
                    'country': 'India',
                    'postCode': '380016',
                    'duns': 'AVVCC',
                    'vatNumber': 'ABCC',
                    'tradingName': 'My trading name',
                    'tradingWebsite': 'https://www.google.com',
                    'tradingSummary': '<p>csdfsdfdf sd fsd fds fs dfdfds sd fds fdsfsd fds fds fds fds fds fds fds fds fdsf dsfds</p>\n',
                    'tradingLogo': 'https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/local-trading-logo/5f4754eb3fc8842306a8220d',
                    'tradingAddressLineOne': 'Trading Address one',
                    'tradingAddressLineTwo': 'Trading address two',
                    'tradingCity': 'Ahmedabad',
                    'tradingCountry': 'India',
                    'tradingPostCode': '345678'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
