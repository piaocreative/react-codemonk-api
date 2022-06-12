
const responses = {
    200: {
        description: 'Download document',
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
};

module.exports = swaggerJson => {

    swaggerJson.paths['/v2/talent/download/document'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'download document by user',
            summary: 'download document by user',
            parameters: [
                {
                    in: 'query',
                    name: 'type',
                    description: 'Type of the document to download',
                    required: true,
                    example: CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_KEYS[0],
                    default: CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_KEYS[0],
                    type: 'string',
                    enum: CONSTANTS.USER_DOCUMENT_FILE.ALLOWED_KEYS
                }
            ],
            responses
        }
    };




    return swaggerJson;
};
