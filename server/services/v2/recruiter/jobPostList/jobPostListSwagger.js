const message = require('../../../../locales/en');
const {
    YEAR_OF_EXPERIENCE, ASSIGNMENTS, WORK_PREFERENCE, SKILLS, PRIMARY_ROLE, TEAM_PREFERENCE, BRIEF_FILTERS: {
        DATE_POSTED
    }
} = CONSTANTS;
module.exports = swaggerJson => {
    swaggerJson.paths['/v2/recruiter/job-post/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Recruiter - Job Post(v2)'
            ],
            parameters: [{
                'in': 'query',
                'name': 'q',
                'description': 'Search string (Filter using brief name and brief description)',
                type: 'string'
            }, {
                'in': 'query',
                'name': 'teamPreference',
                'description': 'teamPreference as string.',
                items: {
                    enum: TEAM_PREFERENCE
                },
                type: 'array'
            },
            {
                'in': 'query',
                'name': 'workPreference',
                'description': 'Multi select work preference',
                items: {
                    enum: WORK_PREFERENCE
                },
                type: 'array'

            },
            {
                'in': 'query',
                'name': 'assignments',
                'description': 'Assignment filter',
                items: {
                    enum: ASSIGNMENTS
                },
                type: 'array'
            },
            {
                in: 'query',
                name: 'expertise',
                description: 'Expertise filter',
                items: {
                    enum: YEAR_OF_EXPERIENCE
                },
                type: 'array'
            },
            {
                in: 'query',
                name: 'role',
                description: 'Role filter',
                items: {
                    enum: PRIMARY_ROLE
                },
                type: 'array'
            },
            {
                in: 'query',
                name: 'skills',
                description: 'Skills filter',
                items: {
                    enum: SKILLS
                },
                type: 'array'
            },
            {
                in: 'query',
                name: 'datePosted',
                description: 'Skills filter',
                enum: DATE_POSTED,
                type: 'string'
            },
            {
                in: 'query',
                name: 'limit',
                description: 'limit for result set',
                type: 'integer'
            },
            {
                in: 'query',
                name: 'page',
                description: 'page of result set',
                type: 'integer'
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
                description: 'Sort in job post'
            }],
            description: 'talent job post list',
            summary: 'talent job post list',
            responses: {
                200: {
                    description: 'talent job post list',
                    schema: {
                        $ref: '#/definitions/talentJobPostListsuccess'
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

    swaggerJson.definitions.talentJobPostListsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: '5f97c88aa350e416d1a5ebaa',
                        name: 'Test',
                        description: 'This is test',
                        budget: '$50k-$150k',
                        skills: [
                            'web-development'
                        ],
                        workPreference: [
                            'parttime-weekdays-am',
                            'parttime-weekdays-pm'
                        ],
                        teamPreference: [
                            'small-team'
                        ],
                        assignments: [
                            'remote-only'
                        ]
                    }],
                    totalDocs: 21,
                    limit: 20,
                    page: 2,
                    totalPages: 2,
                    pagingCounter: 21,
                    hasPrevPage: true,
                    hasNextPage: false,
                    prevPage: 1,
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
