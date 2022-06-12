const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/profile'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'save agency profile details',
            summary: 'save agency profile details',
            parameters: [{
                in: 'formData',
                name: 'tradingLogo',
                type: 'file',
                description: 'Upload trading logo',
                required: true
            },
            {
                in: 'formData',
                name: 'firstName',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'lastName',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'designation',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'countryCode',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'phoneNumber',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyName',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'registeredNumber',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyPostCode',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyAddressLineOne',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyAddressLineTwo',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'agencyCity',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyCountry',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'duns',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'agencyVatNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingName',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingWebsite',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingSummary',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingPostCode',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingAddressLineOne',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingAddressLineTwo',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'tradingCity',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'tradingCountry',
                type: 'string',
                required: true
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
