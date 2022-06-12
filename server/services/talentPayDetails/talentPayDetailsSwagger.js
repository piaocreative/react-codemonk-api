const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/pay-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent'
            ],
            'description': 'Update pay details',
            'summary': 'Update pay details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': `payType as "bank" or "paypal"
                        /billingType as "freelancer" or "company" `,
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/payDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update pay details',
                    'schema': {
                        '$ref': '#/definitions/successpayDetails'
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

    swaggerJson.definitions.payDetails = {
        type: 'object',
        properties: {
            currency: {
                type: 'string',
                example: 'USD'
            },
            ratePerHour: {
                type: 'number',
                example: 40
            },
            billingType: {
                type: 'string',
                example: 'company' // you can pass freelancer for freelancer option
            },
            companyName: {
                type: 'string',
                example: 'Soft Silicon'
            },
            companyregisteredNumber: {
                type: 'string',
                example: 'ABC'
            },
            companyPincode: {
                type: 'string',
                example: '380015'
            },
            companyCity: {
                type: 'string',
                example: 'Ahmedabad'
            },
            companyCountry: {
                type: 'string',
                example: 'India'
            },
            companyAddressLineOne: {
                type: 'string',
                example: 'Some Building'
            },
            companyAddressLineTwo: {
                type: 'string',
                example: 'Some Stree'
            },
            website: {
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            vatNumber: {
                type: 'string',
                example: 'ABC'
            },
            companyProfessionInsuranceValue: {
                type: 'number',
                example: 1000000
            },
            companyPublicInsurancesValue: {
                type: 'number',
                example: 2000000
            },
            companyEmployerInsuranceValue: {
                type: 'number',
                example: 3000000
            },
            payType: {
                type: 'string',
                example: 'bank' // You can pass paypal for paypal option
            },
            payPalEmail: {
                type: 'string',
                example: 'paypal@example.com'
            },
            bankName: {
                type: 'string',
                example: 'Kotak'
            },
            bankAccountNumber: {
                type: 'string',
                example: 'ABC'
            },
            bankCode: {
                type: 'string',
                example: 'KT11234'
            }
        }
    };

    swaggerJson.definitions.successpayDetails = {
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
