const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/user/details'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User(v2)'
            ],
            description: 'Step wise user Details',
            summary: 'Step wise user Details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userProfileDetails'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Professional details get',
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

    swaggerJson.definitions.userProfileDetails = {
        'type': 'object',
        'properties': {
            'query': {
                'type': 'string',
                'example': 'query{\n  infos{role} \n}'
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
            data: {
                type: 'object',
                example: {
                    'infos': {
                        'role': 2
                    }
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
