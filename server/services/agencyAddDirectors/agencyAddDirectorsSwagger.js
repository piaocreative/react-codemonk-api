const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/directors'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Update agency directors / shareholders details',
            summary: 'Update agency directors / shareholders details',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Update agency directors / shareholders details',
                required: true,
                schema: {
                    $ref: '#/definitions/agencyDirectorsDetails'
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

    swaggerJson.definitions.agencyDirectorsDetails = {
        type: 'object',
        properties: {
            directors: {
                type: 'array',
                example: [{
                    firstName: 'Director one',
                    lastName: 'Director oneLast',
                    dob: '01/12/2000',
                    postcode: '380013',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    isDirector: true,
                    isShareHolder: false
                },
                {
                    firstName: 'Director two',
                    lastName: 'Director twoLast',
                    dob: '01/11/2000',
                    postcode: '380013',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    isShareHolder: true,
                    holdingPercent: 25
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
