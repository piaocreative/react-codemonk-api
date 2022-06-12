const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/certificate-details'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Update agency certificate details',
            summary: 'Update agency certificate details',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Update agency certificate details',
                required: true,
                schema: {
                    $ref: '#/definitions/agencyCertificateDetails'
                }
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

    swaggerJson.definitions.agencyCertificateDetails = {
        type: 'object',
        properties: {
            certificateDetails: {
                type: 'array',
                example: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
            },
            linkedInUrl: {
                type: 'string',
                example: 'https://www.linkedin.com/in/williamhgates'
            },
            gitHubUrl: {
                type: 'string',
                example: 'https://github.com/bill-gates'
            },
            dribbbleUrl: {
                type: 'string',
                example: 'https://dribbble.com/KendrickKidd'
            },
            clutchUrl: {
                type: 'string',
                example: 'https://clutch.co/profile/hyperlink-infosystem'
            },
            goodfirmsUrl: {
                type: 'string',
                example: 'https://www.goodfirms.co/software/crest-erp'
            },
            otherWebsiteUrl: {
                type: 'string',
                example: 'https://innovify.com/'
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
