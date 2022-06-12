const message = require('../../../locales/en');

module.exports = swaggerJson => {

    swaggerJson.paths['/v2/talent/certificate'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Add a certificate details at the beginning',
            summary: 'Add a certificate',
            parameters: [
                {
                    in: 'formData',
                    name: 'certificate',
                    type: 'file',
                    description: 'Upload certificate attachment'
                },
                {
                    in: 'formData',
                    name: 'name',
                    type: 'string',
                    example: 'AWS Solution Architect',
                    required: true
                },
                {
                    in: 'formData',
                    name: 'dateObtained',
                    type: 'Date',
                    example: '30/08/2019',
                },
                {
                    in: 'formData',
                    name: 'issuedBy',
                    type: 'string',
                    example: 'Amazon',
                },
                {
                    in: 'formData',
                    name: 'certificateId',
                    type: 'string',
                    example: 'ABC123',
                }],
            responses: {
                200: {
                    description: 'certificate Added',
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Edit a certificate details at the beginning',
            summary: 'Edit a certificate',
            parameters: [
                {
                    in: 'formData',
                    name: 'certificate',
                    type: 'file',
                    description: 'Upload certificate attachment'
                },
                {
                    in: 'formData',
                    name: '_id',
                    type: 'string',
                    example: '5ef1bc3ed692e5441ab6f87c',
                    required: true
                },
                {
                    in: 'formData',
                    name: 'name',
                    type: 'string',
                    example: 'AWS Solution Architect 2',
                    required: true
                },
                {
                    in: 'formData',
                    name: 'dateObtained',
                    type: 'Date',
                    example: '30/08/2019',
                },
                {
                    in: 'formData',
                    name: 'issuedBy',
                    type: 'string',
                    example: 'Amazon',
                },
                {
                    in: 'formData',
                    name: 'certificateId',
                    type: 'string',
                    example: 'ABC123',
                }],
            responses: {
                200: {
                    description: 'certificate Updated',
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
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Delete a certificate details at the beginning',
            summary: 'Delete a certificate',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteCertificate'
                }
            }],
            responses: {
                200: {
                    description: 'certificate deleted',
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

    swaggerJson.definitions.deleteCertificate = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
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
