const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/job-post'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post(v2)',
            ],
            description: 'Add job-post by client',
            summary: 'Add job-post by client user',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/AddJobPost'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Adds new job post',
                    schema: {
                        $ref: '#/definitions/successAddJobPost'
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Job Post(v2)',
            ],
            description: 'Update job-post',
            summary: 'Updates job-post',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/UpdateJobPost'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Updates job post',
                    schema: {
                        $ref: '#/definitions/successUpdateJobPost'
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

    swaggerJson.definitions.AddJobPost = {
        type: 'object',
        properties: {
            projectId: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            },
            projectName: {
                type: 'string',
                example: 'Rapid Call Center'
            },
            projectDescription: {
                type: 'string',
                example: 'Specialty Group overhauled its call center operations, \
                replacing six legacy systems in eight business units with a new \
                platform based on technology from Salesforce and Cast Iron.\
                Industry: Pharmaceuticals'
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
            teamPreference: {
                type: 'array',
                example: ['individuals']
            },
            expertise: {
                type: 'string',
                example: 'Senior - 8 - 12 yrs'
            },
            hardSkills: {
                type: 'array',
                example: ['Angular']
            },
            softSkills: {
                type: 'array',
                example: ['Excel', 'Docs']
            },
            certifications: {
                type: 'array',
                example: ["ADOBE CERTIFIED ASSOCIATE (ACA)"]
            },
            industry: {
                type: 'string',
                example: 'Accounting'
            },
            teamWorking: {
                type: 'string',
                example: 'Team Player'
            },
            discProfile: {
                type: 'string',
                example: 'D - Style'
            },
            languages: {
                type: 'array',
                example: ['English']
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            annualRate: {
                type: 'number',
                example: 40
            },
            currencyAnnualRate: {
                type: 'string',
                example: 'GBP'
            },
            employmentType: {
                type: 'array',
                example: [CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE, CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR]
            },
            ratePerHour: {
                type: 'number',
                example: 40
            },
            currency: {
                type: 'string',
                example: 'GBP'
            },
            assignments: {
                type: 'array',
                example: ['remote-only', 'occational-site-visit']
            },
            workPreference: {
                type: 'array',
                example: ['fulltime']
            },
            duration: {
                type: 'number',
                example: 3
            }
        }
    };

    swaggerJson.definitions.successAddJobPost = {
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

    swaggerJson.definitions.UpdateJobPost = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '60d1e5a0f97dc062965b807f'
            },
            projectId: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            },
            projectName: {
                type: 'string',
                example: 'Rapid Call Center'
            },
            projectDescription: {
                type: 'string',
                example: 'Specialty Group overhauled its call center operations, \
                replacing six legacy systems in eight business units with a new \
                platform based on technology from Salesforce and Cast Iron.\
                Industry: Pharmaceuticals'
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
            teamPreference: {
                type: 'array',
                example: ['individuals']
            },
            expertise: {
                type: 'string',
                example: 'Senior - 8 - 12 yrs'
            },
            hardSkills: {
                type: 'array',
                example: ['Angular']
            },
            softSkills: {
                type: 'array',
                example: ['Excel', 'Docs']
            },
            certifications: {
                type: 'array',
                example: ["ADOBE CERTIFIED ASSOCIATE (ACA)"]
            },
            industry: {
                type: 'string',
                example: 'Accounting'
            },
            teamWorking: {
                type: 'string',
                example: 'Team Player'
            },
            discProfile: {
                type: 'string',
                example: 'D - Style'
            },
            languages: {
                type: 'array',
                example: ['English']
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            annualRate: {
                type: 'number',
                example: 40
            },
            currencyAnnualRate: {
                type: 'string',
                example: 'GBP'
            },
            employmentType: {
                type: 'array',
                example: [CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE, CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR]
            },
            ratePerHour: {
                type: 'number',
                example: 40
            },
            currency: {
                type: 'string',
                example: 'GBP'
            },
            assignments: {
                type: 'array',
                example: ['remote-only', 'occational-site-visit']
            },
            workPreference: {
                type: 'array',
                example: ['fulltime']
            },
            duration: {
                type: 'number',
                example: 3
            }
        }
    };

    swaggerJson.definitions.successUpdateJobPost = {
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
