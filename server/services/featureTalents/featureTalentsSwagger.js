const message = require('../../locales/en');
const {
    YEAR_OF_EXPERIENCE, ASSIGNMENTS, WORK_PREFERENCE,
    PRIMARY_ROLE, TEAM_PREFERENCE, EDUCATION_DEGREE, SKILLS, DISC_PROFILE, TEAM_WORKING
} = CONSTANTS;
const countryList = require('../../util/country');
const languages = require('../../util/languageISO');
const Currencies = require('../../util/currency')
module.exports = swaggerJson => {
    swaggerJson.paths['/talent/feature'] = {
        get: {
            tags: [
                'Other'
            ], parameters: [{
                in: 'query',
                name: 'limit',
                description: 'limit for featured talent',
                default: 15
            },
            {
                in: 'query',
                name: 'role',
                enum: ['all'].concat(PRIMARY_ROLE)
            },
            {
                in: 'query',
                name: 'yearsOfExperience',
                type: 'array',
                items: {
                    enum: YEAR_OF_EXPERIENCE
                }
            },
            {
                in: 'query',
                name: 'teamPreference',
                type: 'array',
                items: {
                    enum: TEAM_PREFERENCE
                }
            },
            {
                in: 'query',
                name: 'workPreference',
                type: 'array',
                items: {
                    enum: WORK_PREFERENCE
                }
            },
            {
                in: 'query',
                name: 'assignment',
                type: 'array',
                items: {
                    enum: ASSIGNMENTS
                }
            },
            {
                in: 'query',
                name: 'location',
                type: 'array',
                items: {
                    enum: ['all'].concat(countryList.map((d) => {
                        return d.name;
                    }))
                }
            },
            {
                in: 'query',
                name: 'degreeLevel',
                type: 'array',
                items: {
                    enum: EDUCATION_DEGREE
                }
            },
            {
                in: 'query',
                name: 'language',
                type: 'array',
                items: {
                    enum: languages.map((d) => {
                        return d.code;
                    })
                }
            },
            {
                in: 'query',
                name: 'skills',
                items: {
                    enum: SKILLS
                },
                type: 'array'
            },{
                in: 'query',
                name: 'sort',
                type: 'string',
                enum: [
                    '{ "_id":  1 }',
                    '{ "_id": -1 }',
                    '{ "experienceOrder": 1 }',
                    '{ "experienceOrder": -1 }'],
                description: 'Sort in talent'
            }],
            description: 'talent feature talent list',
            summary: 'talent feature talent list',
            responses: {
                200: {
                    description: 'talent feature talent list',
                    schema: {
                        $ref: '#/definitions/featureTalentssuccess'
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

    swaggerJson.definitions.featureTalentssuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    docs: [{
                        '_id': '5f8ef191236a1d065262cc12',
                        'name': 'Agency  Talent',
                        'skills': ['Node'],
                        'addressLineOne': 'Shyamal Cross Road, Shyamal',
                        'addressLineTwo': '',
                        'city': 'Ahmedabad',
                        'country': 'India'
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
