const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/projects'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            parameters: [{
                in: 'query',
                name: 'status',
                description: `filter of status
                0 = Requested, 1 = Proposed, 2 = Discovery, 3 = Kick-off, 4 = In Progress, 5 = On Hold, 6 = Suspended, 7 = Closed`
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
            },
            {
                in: 'query',
                name: 'sort',
                type: 'string',
                enum: [
                    '_id',
                    '-_id',
                    'name',
                    '-name'],
                description: 'Sort in project search'
            }],
            description: 'client project list',
            summary: 'client project list based on name',
            responses: {
                200: {
                    description: 'Client project list',
                    schema: {
                        $ref: '#/definitions/clientProjectListsuccess'
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

    swaggerJson.definitions.clientProjectListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5f7de119e6eb7427fe0cac0a',
                        name: 'This is final test',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7db9a20c8b3f78bba668a2',
                        name: 'One more test for page settings',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7db8bf0c8b3f78bba668a1',
                        name: 'Test new template',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d87131268d34e9bc1e8a0',
                        name: 'new file check 8',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d86eb723ccf4e7113a4c9',
                        name: 'new file check 7',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d77323870cb3dba9ea1e2',
                        name: 'new file check 6',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d7065816fcc36e5c9f8f0',
                        name: 'new file check 5',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d7010816fcc36e5c9f8ef',
                        name: 'new file check 4',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d6b8bc5bd5c316f261782',
                        name: 'new file check 3',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d6b5b66a3a12f8a724d79',
                        name: 'new file check 2',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d6a7666a3a12f8a724d78',
                        name: 'new file check 1',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d686412ab5a2bd63c5630',
                        name: 'New project test1',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7d65f52af7fd250bd45357',
                        name: 'New project name',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7ca70580cd4a5ba230251e',
                        name: 'CodeMonk phase3',
                        status: 'Requested'
                    },
                    {
                        _id: '5f7ca5df11a3d15941f9302a',
                        name: 'CodeMonk phase2',
                        status: 'Requested'
                    },
                    {
                        _id: '5f75b9cbe0d2005af182f5f2',
                        name: 'CodeMonk',
                        status: 'Requested'
                    },
                    {
                        _id: '5f6a1529f658f55d78e9a33b',
                        name: 'Engage Bay',
                        status: 'Requested'
                    },
                    {
                        _id: '5f64fd518893dc6169254997',
                        name: 'CodeMonk talent key',
                        status: 'Requested'
                    },
                    {
                        _id: '5f64cb45e1b07e36427791ba',
                        name: 'CodeMonk phase 6',
                        status: 'Requested'
                    },
                    {
                        _id: '5f64caba7263037fe2b6dc8d',
                        name: 'CodeMonk phase 6',
                        status: 'Requested'
                    }],
                    totalDocs: 137,
                    limit: 20,
                    page: 1,
                    totalPages: 7,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
