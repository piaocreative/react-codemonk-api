const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/algo-api/talent/{id}/top-skills'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Algorithm Api'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'id of job post'
            }],
            description: 'Change status of agency',
            summary: 'Change status of agency',

            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/success'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/algo-api/users'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Algorithm Api'
            ],

            description: 'Change status of agency',
            summary: 'Change status of agency',

            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/success'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };


    swaggerJson.paths['/algo-api/talent/test'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Algorithm Api'
            ],

            description: 'Change status of agency',
            summary: 'Change status of agency',

            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/success'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };


    swaggerJson.paths['/algo-api/job-brief/{id}/recommended-candidates'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Algorithm Api'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'id of job post'
            }],
            description: "Job brief's recommended calndidates according to job Role",
            summary: "Job brief's recommended calndidates according to job Role",

            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/jobBriefRecommendedCandidates'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
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

    swaggerJson.definitions.agencyStatusChange = {
        type: 'object',
        properties: {
            agencyId: {
                type: 'string',
                example: 'agencyId'
            },
            status: {
                type: 'number',
                example: 2
            }
        }
    };

    swaggerJson.definitions.agencyStatusChangeSuccess = {
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

    swaggerJson.definitions.jobBriefRecommendedCandidates = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data : {
                example: {
                    "docs": [
                      {
                        "_id": "5f05816d241084000801c2c5",
                        "profilePicture": "https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/development-proflie-pictures/5f05816d241084000801c2c4",
                        "name": "Maulik Sailor",
                        "teamPreference": [
                          "small-team",
                          "large-team"
                        ],
                        "assignments": [
                          "occational-site-visit",
                          "remote-only",
                          "mid-term-onsite",
                          "short-term-onsite"
                        ],
                        "skills": [
                          {
                            "_id": "5f05829d241084000801c2c9",
                            "name": "User Research",
                            "rate": 10
                          }
                        ],
                        "certificateDetails": [],
                        "workExperience": [],
                        "city": "London",
                        "country": "United Kingdom",
                        "timeZone": "Europe/London",
                        "primaryRole": "Product Manager",
                        "professionalSummary": "",
                        "availability": true,
                        "workPreference": [
                          "fulltime"
                        ],
                        "currency": "GBP",
                        "experienceOrder": 3,
                        "firstName": "Maulik",
                        "lastName": "",
                        "yearsOfExperience": "Senior ",
                        "ratePerHour": 780
                      }
                    ],
                    "totalDocs": 9,
                    "limit": 20,
                    "page": 1,
                    "totalPages": 1,
                    "pagingCounter": 1,
                    "hasPrevPage": false,
                    "hasNextPage": false,
                    "prevPage": null,
                    "nextPage": null
                  }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
