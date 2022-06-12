const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/interview'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            description: 'Add interview by client',
            summary: 'Add interview by client user',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/addInterviewSchedule'
                }
            }
            ],
            responses: {
                200: {
                    description: 'Update client user billing details',
                    schema: {
                        $ref: '#/definitions/successAddProject'
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
                    description: 'Something went wrong.Try again.',
                    schema: {
                        $ref: '# / definitions / unexpextedError'
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

    swaggerJson.definitions.addInterviewSchedule = {
        type: 'object',
        properties: {
            talentId: {
                type: 'string',
                example: 'ABCS'
            },
            projectId: {
                type: 'string',
                example: 'ABCS'
            },
            name: {
                type: 'string',
                example: 'CodeMonk'
            },
            description: {
                type: 'string',
                example: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
            },
            timeSlots: {
                type: 'array',
                example: [
                    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                    new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
                    new Date(new Date().getTime() + 72 * 60 * 60 * 1000)
                ]
            }
        }
    };

    swaggerJson.definitions.successAddProject = {
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
