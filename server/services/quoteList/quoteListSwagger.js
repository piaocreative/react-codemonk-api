const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/quote/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Quote'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'limit for result set'
            }, {
                in: 'query',
                name: 'status',
                enum: ['1', '2', '3', '4'],
                description: `
                    Status Filter based on agency actions:
                        1: New (without any agency response)
                        2: Response received
                        3: Allocated
                        4: Closed
                `
            }, {
                in: 'query',
                name: 'limit',
                description: 'limit for result set'
            },
            {
                in: 'query',
                name: 'page',
                description: 'page of result set'
            }],
            description: 'Quote list',
            summary: 'Quote list',
            responses: {
                200: {
                    description: 'Quote list',
                    schema: {
                        $ref: '#/definitions/quoteListsuccess'
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

    swaggerJson.definitions.quoteListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5fa53342be9c067b2295af22',
                        projectId: '5f2ac7797a0f5e1ad5e94381',
                        name: 'New one',
                        description: 'dfdsfjdsfkl ds fdskjf dsk jfkdsjf kdsjkfdskf dskjfkdsfkjds flkds jfds f',
                        quoteUrl: 'quoteurl',
                        isApplied: true
                    }],
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
