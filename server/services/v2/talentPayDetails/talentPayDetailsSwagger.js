const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/pay-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
            ],
            'description': 'Update pay details',
            'summary': 'Update pay details',
            'parameters': [
                {
                    in: 'formData',
                    name: 'companyLogo',
                    type: 'file',
                    description: 'Upload company logo'
                },
                {
                    in: 'formData',
                    name: 'employmentType',
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    required: true,
                    description: `can be either from two options '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE}' or '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}'`
                },
                {
                    in: 'formData',
                    name: 'currencyAnnualRate',
                    type: 'string',
                    example: `GBP`,
                    description: `Currency Annual rate for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'annualRate',
                    type: 'number',
                    example: `10`,
                    description: `Annual rate for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'currency',
                    type: 'string',
                    example: 'GBP',
                    description: `Currency for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'ratePerHour',
                    type: 'number',
                    example: '10',
                    description: `Rate per hour for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'billingType',
                    type: 'string',
                    description: `can be either from two options 'company' or 'freelancer' for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type`
                },
                {
                    in: 'formData',
                    name: 'companyName',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyregisteredNumber',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyPincode',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyCity',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyState',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyCountry',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyAddressLineOne',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'companyAddressLineTwo',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'website',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'vatNumber',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'currencyCompanyProfessionInsuranceValue',
                    type: 'string',
                    example: `GBP`,
                    description: `Profession Insurance Value Currency for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'companyProfessionInsuranceValue',
                    type: 'number'
                },
                {
                    in: 'formData',
                    name: 'currencyCompanyPublicInsurancesValue',
                    type: 'string',
                    example: `GBP`,
                    description: `Public Insurance Value Currency for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'companyPublicInsurancesValue',
                    type: 'number'
                },
                {
                    in: 'formData',
                    name: 'currencyCompanyEmployerInsuranceValue',
                    type: 'string',
                    example: `GBP`,
                    description: `Employer Insurance Value Currency for '${CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR}' employment type.`
                },
                {
                    in: 'formData',
                    name: 'companyEmployerInsuranceValue',
                    type: 'number'
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
