const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/project/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            parameters: [{
                in: 'query',
                name: 'status',
                description: `filter option for project status
                // -1 = All, 0 = Requested, 1 = Proposed, 2 = Discovery, 3 = Kick-off,
                // 4 = In Progress, 5 = On Hold, 6 = Suspended, 7 = Closed`
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
            description: 'agency project list',
            summary: 'agency project list',
            responses: {
                200: {
                    description: 'agency project list',
                    schema: {
                        $ref: '#/definitions/agencyProjectListsuccess'
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
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ERROR_MSG
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

    swaggerJson.definitions.agencyProjectListsuccess = {
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
                            _id: '5f84546a34f5da01ab023de0',
                            name: 'CodeMonk edit1',
                            talentsUserDetails: [{
                                _id: '5f524931452e5002a19a9430',
                                name: 'Some Parikh',
                                profilePicture: 'PROFILE_PIC_URL'
                            }],
                            status: 'Discovery'
                        }
                    ],
                    totalDocs: 1,
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
