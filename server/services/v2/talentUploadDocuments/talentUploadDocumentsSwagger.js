const message = require('../../../locales/en');

module.exports = swaggerJson => {
    
    swaggerJson.paths['/v2/talent/upload-documents'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Uploading the documents',
            summary: 'Uploading the documents',
            consumes: 'application/x-www-form-urlencoded',
            produces: ['application/xml', 'application/json'],
            parameters: [{
                in: 'formData',
                name: 'idProof',
                type: 'file',
                description: 'Upload documents user identity proof'
            },
            {
                in: 'formData',
                name: 'addressProof',
                type: 'file',
                description: 'Upload documents user address proof'
            },
            {
                in: 'formData',
                name: 'companyIncorporationCertificateUrl',
                type: 'file',
                description: 'Upload documents user company incorporation certificate proof'
            },
            {
                in: 'formData',
                name: 'companyVatRegistrationCertificateUrl',
                type: 'file',
                description: 'Upload documents user compnay vat registration certificate proof'
            },
            {
                in: 'formData',
                name: 'companyInsuranceDocumentUrl',
                type: 'file',
                description: 'Upload documents user company insurance certificate proof'
            },
            {
                in: 'formData',
                name: 'billingType',
                type: 'string',
                description: 'can be either from two options \'company\' or \'freelancer\''
            }],
            responses: {
                200: {
                    description: 'billing Updated',
                    schema: {
                        $ref: '#/definitions/successDetails'
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
