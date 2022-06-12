const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/documents'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Upload documents like id, address proof etc',
            summary: 'Any documents from id, address proof, company incorporation,'
                + ' compney vat registration, company insurance certificate upload',
            parameters: [{
                in: 'formData',
                name: 'idProof0',
                type: 'file',
                description: 'Upload documents user identity proof for first director'
            },
            {
                in: 'formData',
                name: 'addressProof0',
                type: 'file',
                description: 'Upload documents user address for first director'
            },
            {
                in: 'formData',
                name: 'idProof1',
                type: 'file',
                description: 'Upload documents user identity proof for second director'
            },
            {
                in: 'formData',
                name: 'addressProof1',
                type: 'file',
                description: 'Upload documents user address for second director'
            },
            {
                in: 'formData',
                name: 'companyIncorporationCertificateUrl',
                type: 'file',
                description: 'Upload documents user company incorporation certificate proof'
            },
            {
                in: 'formData',
                name: 'companyTaxRegistrationCertificateUrl',
                type: 'file',
                description: 'Upload documents user compnay tax registration certificate proof'
            },
            {
                in: 'formData',
                name: 'utilityBillDocumentUrl',
                type: 'file',
                description: 'Upload documents user utility bill proof'
            }],
            responses: {
                200: {
                    description: 'Any documents from id, address proof, company incorporation,'
                        + ' compney tax registration, utility bill',
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
                'Agency'
            ],
            description: 'Delete agency documents',
            summary: 'Any documents from id, address proof, company incorporation,'
                + ' compney vat registration, company insurance certificate delete operation',
            parameters: [{
                in: 'formData',
                name: 'document',
                type: 'string',
                description: `Optionas are 'idProof0', 'addressProof0', 'idProof1', 'addressProof1',
                    'companyIncorporationCertificateUrl', 'companyTaxRegistrationCertificateUrl',
                    'utilityBillDocumentUrl'`
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
