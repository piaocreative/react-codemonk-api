const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/tests/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Tests'
            ],
            description: 'Extract the test result',
            summary: 'Extract the test result',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Test id',
                    required: true,
                    example: '3252'
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/extractTestSuccess'
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




    swaggerJson.definitions.extractTestSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                example: {
                    "status": "Test Completed",
                    "rating": "0.8",
                    "submitReason": "User Submitted",
                    "timeTaken": "192",
                    "attemptTime": "21 Sep 2021 12:36:29 AM"
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
