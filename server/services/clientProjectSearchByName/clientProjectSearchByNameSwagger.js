const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/project/list'] = {
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
                description: 'name of project'
            }],
            description: 'client project list search by name',
            summary: 'client project list based on name',
            responses: {
                200: {
                    description: 'Client project list',
                    schema: {
                        $ref: '#/definitions/clientProjectSearchByNamesuccess'
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

    swaggerJson.definitions.clientProjectSearchByNamesuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: [{
                    '_id': '5f2abf4364712b10ad0e8e3c',
                    'name': 'CodeMonk',
                    'description': `The standard chunk of Lorem Ipsum used since
                        the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
                        by Cicero are also reproduced in their exact original form,
                        accompanied by English versions from the 1914 translation by H. Rackham.`
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
