const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/tests'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Tests'
            ],
            description: 'Tests for the talent',
            summary: 'Tests for the talent',

            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/listTestsSuccess'
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




    swaggerJson.definitions.listTestsSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                example: {
                    "id": "3252",
                    "name": "Software Engineer",
                    "duration": "40",
                    "url": "https://conceptninjas.com/ninjascreen/evaluate/qUD7M",
                    "description": null
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
