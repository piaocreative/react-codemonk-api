const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/user/documents'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Upload documents like id, address proof etc',
            summary: 'Any documents from id, address proof, company incorporation,'
                + ' compney vat registration, company insurance certificate upload',
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
            }],
            responses: {
                200: {
                    description: 'Any documents from id, address proof, company incorporation,'
                        + ' compney vat registration, company insurance certificate uploaded',
                    schema: {
                        '$ref': '#/definitions/successUserDocument'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        '$ref': '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Delete user documents',
            summary: 'Any documents from id, address proof, company incorporation,'
                + ' compney vat registration, company insurance certificate delete operation',
            parameters: [{
                in: 'formData',
                name: 'document',
                type: 'string',
                description: `Optionas are 'idProof', 'addressProof',
                    'companyIncorporationCertificateUrl', 'companyVatRegistrationCertificateUrl',
                    'companyInsuranceDocumentUrl'`
            }],
            responses: {
                200: {
                    description: 'Any documents from id, address proof, company incorporation,'
                        + ' compney vat registration, company insurance certificate deleted',
                    schema: {
                        '$ref': '#/definitions/successDeleteUserDocuments'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        '$ref': '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        '$ref': '#/definitions/unexpextedError'
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
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successUserDocument = {
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

    swaggerJson.definitions.successDeleteUserDocuments = {
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
