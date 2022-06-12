const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/job-post/basic-details'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post'
            ],
            description: 'Edit job-post by client',
            summary: 'Edit job-post by client user (Step 1)',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/editJobPostBasicDetails'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Update client user billing details',
                    schema: {
                        $ref: '#/definitions/successEditJobPostBasicDetails'
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

    swaggerJson.definitions.editJobPostBasicDetails = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '60d1e5a0f97dc062965b807f'
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
            role: {
                type: 'string',
                example: 'Solution Architect'
            },
            workPreference: {
                type: 'array',
                example: ['fulltime']
            },
            teamPreference: {
                type: 'array',
                example: ['individuals']
            },
            assignments: {
                type: 'array',
                example: ['remote-only', 'occational-site-visit']
            },
            expertise: {
                type: 'string',
                example: 'Senior - 8 - 12 yrs'
            },
            duration: {
                type: 'number',
                example: 3
            }
        }
    };

    swaggerJson.definitions.successEditJobPostBasicDetails = {
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
