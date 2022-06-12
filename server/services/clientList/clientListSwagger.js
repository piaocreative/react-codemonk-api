const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'Filter client first name, last name and email'
            },
            {
                in: 'query',
                name: 'status',
                description: `Filter radio option for client status
                // -1 = All, 0 = Unregistered, 1 = Active or 2 = Suspended`
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
            description: 'client list',
            summary: 'client list',
            responses: {
                200: {
                    description: 'Client list',
                    schema: {
                        $ref: '#/definitions/clientListSuccess'
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

    swaggerJson.definitions.clientListSuccess = {
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
                        email: 'client@mailinator.com',
                        clientUserId: '5f05c940aff1590c69b00906',
                        name: 'Main client',
                        status: 'Active'
                    },
                    {
                        _id: '5f084e0cd8282d0262380ead',
                        email: 'newclient@mailinator.com',
                        clientUserId: '5f084e0cd8282d0262380eac',
                        name: 'Client\'sFirst Client\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f08589760b8ea193e426d60',
                        email: 'clientprofile@mailinator.com',
                        clientUserId: '5f08589760b8ea193e426d5f',
                        name: 'Client\'sFirst Client\'s Last',
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f30f3930997b6547a590f95',
                        email: 'client1@mailinator.com',
                        clientUserId: '5f30f3920997b6547a590f94',
                        name: 'Client\'sFirst Client\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3bb8f2d7909259dd2df51a',
                        email: 'onboardingbilling@mailinator.com',
                        clientUserId: '5f3bb8f2d7909259dd2df519',
                        name: 'Client\'sFirst Client\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3ccf4a0fb493164a9d2e6e',
                        email: 'clientphonechange@mailinator.com',
                        clientUserId: '5f3ccf4a0fb493164a9d2e6d',
                        name: 'Hitesh Parikh',
                        status: 'Active'
                    },
                    {
                        _id: '5f3e2ada9040281f8a09c51b',
                        email: 'testingsignupphoneissue1@mailinator.com',
                        clientUserId: '5f3e2ada9040281f8a09c51a',
                        name: 'Hitesh Parikh1',
                        status: 'Active'
                    },
                    {
                        _id: '5f44a8d91fb7d718a9cc5d46',
                        email: 'localclient@mailinator.com',
                        clientUserId: '5f44a8d91fb7d718a9cc5d45',
                        name: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f4611c8571084334e86fd69',
                        email: 'myfirstname@mailinator.com',
                        clientUserId: '5f4611c8571084334e86fd68',
                        name: 'Hitesh1 Parikh1',
                        status: 'Active'
                    },
                    {
                        _id: '5f5741aae76b0a4ca72d8e2d',
                        email: 'newclientwithacl@mailinator.com',
                        clientUserId: '5f5741aae76b0a4ca72d8e2c',
                        name: 'Hitesh Parikh',
                        status: 'Suspend'
                    },
                    {
                        _id: '5f7de161e6eb7427fe0cac0c',
                        email: 'prodproblem@mailinator.com',
                        clientUserId: '5f7de161e6eb7427fe0cac0b',
                        name: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f8eee61c4336d7911646116',
                        email: 'enclient@mailinator.com',
                        clientUserId: '5f8eee61c4336d7911646115',
                        name: 'Hitesh Parikh',
                        status: 'Active'
                    },
                    {
                        _id: '5f8eef585deda502ff9b5c74',
                        email: 'ennewclient@mailinator.com',
                        clientUserId: '5f8eef585deda502ff9b5c73',
                        name: 'Hitesh Parikh',
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
