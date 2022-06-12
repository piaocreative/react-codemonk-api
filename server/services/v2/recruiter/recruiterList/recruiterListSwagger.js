const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/recruiter/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Recruiter(v2)'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'Filter recruiter first name, last name and email'
            },
            {
                in: 'query',
                name: 'status',
                description: `Filter radio option for recruiter status
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
            description: 'recruiter list',
            summary: 'recruiter list',
            responses: {
                200: {
                    description: 'Recruiter list',
                    schema: {
                        $ref: '#/definitions/recruiterListSuccess'
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

    swaggerJson.definitions.recruiterListSuccess = {
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
                        email: 'recruiter@mailinator.com',
                        recruiterUserId: '5f05c940aff1590c69b00906',
                        name: 'Main recruiter',
                        status: 'Active'
                    },
                    {
                        _id: '5f084e0cd8282d0262380ead',
                        email: 'newrecruiter@mailinator.com',
                        recruiterUserId: '5f084e0cd8282d0262380eac',
                        name: 'recruiter\'sFirst recruiter\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f08589760b8ea193e426d60',
                        email: 'recruiterprofile@mailinator.com',
                        recruiterUserId: '5f08589760b8ea193e426d5f',
                        name: 'recruiter\'sFirst recruiter\'s Last',
                        status: 'Registered'
                    },
                    {
                        _id: '5f30f3930997b6547a590f95',
                        email: 'recruiter1@mailinator.com',
                        recruiterUserId: '5f30f3920997b6547a590f94',
                        name: 'recruiter\'sFirst recruiter\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3bb8f2d7909259dd2df51a',
                        email: 'onboardingbilling@mailinator.com',
                        recruiterUserId: '5f3bb8f2d7909259dd2df519',
                        name: 'recruiter\'sFirst recruiter\'s Last',
                        status: 'Active'
                    },
                    {
                        _id: '5f3ccf4a0fb493164a9d2e6e',
                        email: 'recruiterphonechange@mailinator.com',
                        recruiterUserId: '5f3ccf4a0fb493164a9d2e6d',
                        name: 'John Smith',
                        status: 'Active'
                    },
                    {
                        _id: '5f3e2ada9040281f8a09c51b',
                        email: 'testingsignupphoneissue1@mailinator.com',
                        recruiterUserId: '5f3e2ada9040281f8a09c51a',
                        name: 'John Smith1',
                        status: 'Active'
                    },
                    {
                        _id: '5f44a8d91fb7d718a9cc5d46',
                        email: 'localrecruiter@mailinator.com',
                        recruiterUserId: '5f44a8d91fb7d718a9cc5d45',
                        name: null,
                        status: 'Registered'
                    },
                    {
                        _id: '5f4611c8571084334e86fd69',
                        email: 'myfirstname@mailinator.com',
                        recruiterUserId: '5f4611c8571084334e86fd68',
                        name: 'Jogn1 Smith1',
                        status: 'Active'
                    },
                    {
                        _id: '5f5741aae76b0a4ca72d8e2d',
                        email: 'newrecruiterwithacl@mailinator.com',
                        recruiterUserId: '5f5741aae76b0a4ca72d8e2c',
                        name: 'John Smith',
                        status: 'Suspend'
                    },
                    {
                        _id: '5f7de161e6eb7427fe0cac0c',
                        email: 'prodproblem@mailinator.com',
                        recruiterUserId: '5f7de161e6eb7427fe0cac0b',
                        name: null,
                        status: 'Registered'
                    },
                    {
                        _id: '5f8eee61c4336d7911646116',
                        email: 'enrecruiter@mailinator.com',
                        recruiterUserId: '5f8eee61c4336d7911646115',
                        name: 'John Smith',
                        status: 'Active'
                    },
                    {
                        _id: '5f8eef585deda502ff9b5c74',
                        email: 'ennewrecruiter@mailinator.com',
                        recruiterUserId: '5f8eef585deda502ff9b5c73',
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
