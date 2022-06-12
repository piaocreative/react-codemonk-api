const message = require('../../locales/en');
const {
    YEAR_OF_EXPERIENCE, ASSIGNMENTS, WORK_PREFERENCE, SKILLS, PRIMARY_ROLE, TEAM_PREFERENCE, BRIEF_FILTERS: {
        DATE_POSTED, APPLIED
    }
} = CONSTANTS;
module.exports = swaggerJson => {
    swaggerJson.paths['/job-post/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post'
            ],
            parameters: [{
                'in': 'query',
                'name': 'q',
                'description': 'Search string (Filter using projectName, brief name and brief description)',
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
                name: 'applied',
                description: 'Skills filter',
                enum: APPLIED,
                type: 'string'
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
                    'recommend',
                    '_id',
                    '-_id',
                    'name',
                    '-name',
                    'seniority'
                ],
                description: 'Sort in job post'
            }],
            description: 'talent job post list',
            summary: 'talent job post list',
            responses: {
                200: {
                    description: 'talent job post list',
                    schema: {
                        $ref: '#/definitions/talentJobPostListsuccess1'
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

    swaggerJson.definitions.talentJobPostListsuccess1 = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        _id: "621757fd60e5412f5fea531f",
                        skills: [
                            "Adobe Illustrator"
                        ],
                        workPreference: [
                            "fulltime"
                        ],
                        teamPreference: [
                            "individuals"
                        ],
                        assignments: [
                            "remote-only"
                        ],
                        isArchived: false,
                        hardSkills: [
                            "Adobe Illustrator"
                        ],
                        name: "Dolorem et sunt sint Request Sanity Testing",
                        description: "Ipsam consequuntur e",
                        role: "Product Manager",
                        expertise: "Distinguished - 15+ yrs",
                        projectId: "6217573618ddb72f57cc34d6",
                        jobId: "0002220224",
                        currency: "USD",
                        duration: 30,
                        ratePerHour: 10,
                        timeZone: "Asia/Kolkata",
                        talents: null,
                        recommendOrder: 1,
                        expertiseOrder: "5",
                        isRecommended: true,
                        companyName: "Acton Moreno",
                        clientId: "6217557f18ddb72f57cc34d4",
                        isApplied: false
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
