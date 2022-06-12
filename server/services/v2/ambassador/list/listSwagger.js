const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/ambassador/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Ambassador(v2)'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'Filter ambassador first name, last name and email'
            },
            {
                in: 'query',
                name: 'status',
                description: `Filter radio option for ambassador status
                // -1 = All, 0 = Registered, 1 = Active or 2 = Suspended`
            },
            {
                in: 'query',
                name: 'limit',
                description: 'limit for result set'
            },
            {
                in: 'query',
                name: 'page',
                description: 'page of result set'
            }],
            description: 'ambassador list',
            summary: 'ambassador list',
            responses: {
                200: {
                    description: 'Ambassador list',
                    schema: {
                        $ref: '#/definitions/ambassadorListSuccess'
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

    swaggerJson.definitions.ambassadorListSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5f05c941aff1590c69b00907',
                        email: 'ambassador@mailinator.com',
                        ambassadorUserId: '5f05c940aff1590c69b00906',
                        name: 'Main ambassador',
                        status: 'Active'
                    },
                    {
                        _id: '5f084e0cd8282d0262380ead',
                        email: 'newambassador@mailinator.com',
                        ambassadorUserId: '5f084e0cd8282d0262380eac',
                        name: 'ambassador\'sFirst ambassador\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f08589760b8ea193e426d60',
                        email: 'ambassadorprofile@mailinator.com',
                        ambassadorUserId: '5f08589760b8ea193e426d5f',
                        name: 'ambassador\'sFirst ambassador\'s Last',
                        status: 'Registered'
                    },
                    {
                        _id: '5f30f3930997b6547a590f95',
                        email: 'ambassador1@mailinator.com',
                        ambassadorUserId: '5f30f3920997b6547a590f94',
                        name: 'ambassador\'sFirst ambassador\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3bb8f2d7909259dd2df51a',
                        email: 'onboardingbilling@mailinator.com',
                        ambassadorUserId: '5f3bb8f2d7909259dd2df519',
                        name: 'ambassador\'sFirst ambassador\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3ccf4a0fb493164a9d2e6e',
                        email: 'ambassadorphonechange@mailinator.com',
                        ambassadorUserId: '5f3ccf4a0fb493164a9d2e6d',
                        name: 'John Smith',
                        status: 'Active'
                    },
                    {
                        _id: '5f3e2ada9040281f8a09c51b',
                        email: 'testingsignupphoneissue1@mailinator.com',
                        ambassadorUserId: '5f3e2ada9040281f8a09c51a',
                        name: 'John Smith1',
                        status: 'Active'
                    },
                    {
                        _id: '5f44a8d91fb7d718a9cc5d46',
                        email: 'localambassador@mailinator.com',
                        ambassadorUserId: '5f44a8d91fb7d718a9cc5d45',
                        name: null,
                        status: 'Registered'
                    },
                    {
                        _id: '5f4611c8571084334e86fd69',
                        email: 'myfirstname@mailinator.com',
                        ambassadorUserId: '5f4611c8571084334e86fd68',
                        name: 'Jogn1 Smith1',
                        status: 'Active'
                    },
                    {
                        _id: '5f5741aae76b0a4ca72d8e2d',
                        email: 'newambassadorwithacl@mailinator.com',
                        ambassadorUserId: '5f5741aae76b0a4ca72d8e2c',
                        name: 'John Smith',
                        status: 'Suspend'
                    },
                    {
                        _id: '5f7de161e6eb7427fe0cac0c',
                        email: 'prodproblem@mailinator.com',
                        ambassadorUserId: '5f7de161e6eb7427fe0cac0b',
                        name: null,
                        status: 'Registered'
                    },
                    {
                        _id: '5f8eee61c4336d7911646116',
                        email: 'enambassador@mailinator.com',
                        ambassadorUserId: '5f8eee61c4336d7911646115',
                        name: 'John Smith',
                        status: 'Active'
                    },
                    {
                        _id: '5f8eef585deda502ff9b5c74',
                        email: 'ennewambassador@mailinator.com',
                        ambassadorUserId: '5f8eef585deda502ff9b5c73',
                        name: 'John Smith',
                        status: 'Active'
                    }],
                    totalDocs: 13,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
