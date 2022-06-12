const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/quote/submit'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Quote'
            ],
            description: 'Submit quote by agency',
            summary: 'Submit quote by agency',
            parameters: [{
                in: 'formData',
                name: 'projectPlan',
                type: 'file',
                description: 'Upload project plan',
                required: true
            },
            {
                in: 'formData',
                name: 'effrotsBreakdown',
                type: 'file',
                description: 'Upload effrots break down plan',
                required: true
            },
            {
                in: 'formData',
                name: 'quoteId',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'projectId',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'assumptions',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'outOfScope',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'teamStructure',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'totalCost',
                type: 'number',
                required: true
            },
            {
                in: 'formData',
                name: 'otherInfo',
                type: 'string',
                required: true
            }],
            responses: {
                200: {
                    description: 'Submit quote by agency',
                    schema: {
                        $ref: '#/definitions/successSubmitQuote'
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

    swaggerJson.definitions.successSubmitQuote = {
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
