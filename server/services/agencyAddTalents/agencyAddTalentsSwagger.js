const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/talents'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'add talents to agency profile details',
            summary: 'add talents to agency profile details',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Add talents array',
                required: true,
                schema: {
                    $ref: '#/definitions/addTalents'
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Upload talents to agency profile details',
            summary: 'Upload talents to agency profile details',
            parameters: [{
                in: 'formData',
                name: 'agency-talents',
                type: 'file',
                description: 'Upload csv or xls file for agency talents multiple entries'
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

    swaggerJson.definitions.addTalents = {
        type: 'object',
        properties: {
            talents: {
                type: 'array',
                example: [{
                    firstName: 'Talent One',
                    lastName: 'Talent Last One',
                    email: 'talent1@mailinator.com',
                    currency: 'USD',
                    rate: 40
                },
                {
                    firstName: 'Talent Two',
                    lastName: 'Talent Last Two',
                    email: 'talent2@mailinator.com',
                    currency: 'GBP',
                    rate: 25
                },
                {
                    firstName: 'Talent Three',
                    lastName: 'Talent Last Three',
                    email: 'talent3@mailinator.com',
                    currency: 'EUR',
                    rate: 50
                }]
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
