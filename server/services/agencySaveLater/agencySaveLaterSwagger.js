const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/save-later'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'save later agency onboarding details',
            summary: 'save later agency onboarding details',
            parameters: [{
                in: 'formData',
                name: 'step',
                type: 'number',
                required: true
            }, {
                in: 'formData',
                name: 'tradingLogo',
                type: 'file',
                description: 'Upload trading logo'
            },
            {
                in: 'formData',
                name: 'firstName',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'lastName',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'designation',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'countryCode',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'phoneNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyName',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'registeredNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyPostCode',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyAddressLineOne',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyAddressLineTwo',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyCity',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyCountry',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'duns',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyVatNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingName',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingWebsite',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingSummary',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingPostCode',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingAddressLineOne',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingAddressLineTwo',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingCity',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingCountry',
                type: 'string'
            }],
            responses: {
                200: {
                    description: 'Update project details',
                    schema: {
                        $ref: '#/definitions/success'
                    }
                },
                400: {
                    description: 'Invalid request',
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
