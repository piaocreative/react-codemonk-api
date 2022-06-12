const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/admin/interviews'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Admin'
            ],
            parameters: [{
                in: 'query',
                name: 'status',
                description: `filter of status
                -1 = All, 0 = Requested, 1 = In Progress, 2 = Done`
            },
            {
                in: 'query',
                name: 'page',
                description: 'page number for pagination'
            },
            {
                in: 'query',
                name: 'limit',
                description: 'limit the records for pagination'
            }],
            description: 'admin interviews list',
            summary: 'admin interviews list based on query',
            responses: {
                200: {
                    description: 'admin interviews list',
                    schema: {
                        $ref: '#/definitions/adminInterviewListsuccess'
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

    swaggerJson.definitions.adminInterviewListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [
                        {
                            clientName: 'client\'sFirst admin\'s Last',
                            talentName: 'Hitesh Parikh',
                            _id: '5f800bbea061a724fda3af9b',
                            dateRequested: '2020-10-09T07:05:34.000Z',
                            adminId: '5f05c940aff1590c69b00906',
                            talentId: '5f5b99b01e038f0c7ce1691f',
                            name: 'Engage Bay',
                            timeSlots: [
                                {
                                    isAccepted: 0,
                                    _id: '5f800bbea061a724fda3af9c',
                                    requestedSlot: '2020-10-13T07:30:00.000Z'
                                }
                            ],
                            status: 'Requested'
                        },
                        {
                            clientName: 'client\'sFirst admin\'s Last',
                            talentName: 'Krunal Name',
                            _id: '5f800baba061a724fda3af98',
                            adminId: '5f05c940aff1590c69b00906',
                            talentId: '5f1e76e1035cad67d670f420',
                            dateRequested: '2020-10-09T07:05:34.000Z',
                            name: 'Engage Bay',
                            timeSlots: [
                                {
                                    isAccepted: 0,
                                    _id: '5f800baba061a724fda3af99',
                                    requestedSlot: '2020-10-10T07:30:00.000Z'
                                },
                                {
                                    isAccepted: 0,
                                    _id: '5f800baba061a724fda3af9a',
                                    requestedSlot: '2020-10-13T08:30:00.000Z'
                                }
                            ],
                            status: 'Requested'
                        }
                    ],
                    totalDocs: 2,
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
