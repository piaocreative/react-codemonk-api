const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/project/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Project(v2)'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'id of project'
            }],
            description: 'Get project details',
            summary: 'Get project details',
            responses: {
                200: {
                    description: 'Get project details',
                    schema: {
                        $ref: '#/definitions/projectDetailsuccessV2'
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

    swaggerJson.definitions.projectDetailsuccessV2 = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    _id: '5f631e56d37cbb4801f0fa45',
                    name: 'CodeMonk',
                    description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H.Rackham.`,
                    startDate: '2020-09-30T00:00:00.000Z',
                    endDate: '2020-12-31T00:00:00.000Z',
                    clientName: 'Client\'sFirst Client\'s Last',
                    clientEmail: 'client@mailinator.com',
                    status: 'Proposed',
                    talentsDetails: [
                        {
                            _id: '5f05e1ceec335829f4dea020',
                            isActive: 1,
                            email: 'developer@mailinator.com',
                            firstName: 'Talent',
                            lastName: 'Last',
                            status: 0
                        }
                    ],
                    briefs: [{
                        _id: '5fa2a4164fe7951b56d1c4e2',
                        skills: [
                            'AWS',
                            'AWS Lambda'
                        ],
                        workPreference: [
                            'fulltime'
                        ],
                        teamPreference: [
                            'individuals'
                        ],
                        assignments: [
                            'remote-only',
                            'occational-site-visit'
                        ],
                        projectId: '5f8ef124236a1d065262cc0f',
                        name: 'My second brief',
                        description: 'The standard chunk of Lorem Ipsum used since the 1500s',
                        role: 'Solution Architect',
                        expertise: 'expert',
                        duration: 3
                    },
                    {
                        _id: '5fa2a37bd9713d1644e2ec50',
                        skills: [
                            'AWS',
                            'AWS Lambda'
                        ],
                        workPreference: [
                            'fulltime'
                        ],
                        teamPreference: [
                            'individuals'
                        ],
                        assignments: [
                            'remote-only',
                            'occational-site-visit'
                        ],
                        projectId: '5f8ef124236a1d065262cc0f',
                        name: 'My first brief',
                        description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                        role: 'Solution Architect',
                        expertise: 'expert',
                        duration: 3
                    }],
                    quotes: [{
                        _id: '5fa500eea79f873b8ef67b17',
                        projectId: '5f8ef124236a1d065262cc0f',
                        name: 'Second Breif',
                        description: 'Typeface without relying on meaningful content.',
                        quoteUrl: 'local-quotes/5f5f2cd2f1472c3303b6b861/Barbossa.jpg'
                    }]
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
