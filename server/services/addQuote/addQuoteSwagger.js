const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/quote'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Quote'
            ],
            description: 'Add quote by admin',
            summary: 'Add quote by admin user',
            parameters: [{
                in: 'formData',
                name: 'projectId',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'name',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'description',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'quote',
                type: 'file',
                description: 'Upload quote attachment',
                required: true
            }],
            responses: {
                200: {
                    description: 'Add quote details',
                    schema: {
                        $ref: '#/definitions/successAddQuote'
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
                'Quote'
            ],
            description: 'Edit quote by admin',
            summary: 'Edit quote by admin user',
            parameters: [{
                in: 'formData',
                name: 'id',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'name',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'description',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'quote',
                type: 'file',
                description: 'Upload quote attachment'
            }],
            responses: {
                200: {
                    description: 'Edit quote details',
                    schema: {
                        $ref: '#/definitions/successEditQuote'
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
    swaggerJson.paths['/quote/archive/{quoteId}'] = {
        patch: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post'
            ],
            description: 'Archive Quote by admin',
            summary: 'Archive Quote by admin',
            parameters: [
                {
                    in: 'path',
                    name: 'quoteId',
                    description: 'Body parameter',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                200: {
                    description: 'Archive Quote',
                    schema: {
                        $ref: '#/definitions/successEditQuote'
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

    swaggerJson.definitions.successAddQuote = {
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

    swaggerJson.definitions.successEditQuote = {
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
