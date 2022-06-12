const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/start-test'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Tests'
            ],
            description: 'Start test for the skill',
            summary: 'Start test for the skill',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/startTest'
                    }
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/startTestSuccess'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.startTest = {
        type: 'object',
        properties: {
            url: {
                type: 'string',
                example: 'https://conceptninjas.com/ninjascreen/evaluate/qUD7M'
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

 


    swaggerJson.definitions.startTestSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data : {
                example: {
                    
                    "redirectUrl": 'https://conceptninjas.com/ninjascreen/evaluate/qUD7M??candidateToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYW5kaWRhdGVJZCI6IjYxNDhiNjEzNzdiZDQwNGY0NWQwZGQxZCIsImNvcnBvcmF0ZUlkIjo1ODR9.uXE3NDbnMWpdvgPzKMdk9rij7LtgJdGHk_zGtSXwTIw',
                  }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
