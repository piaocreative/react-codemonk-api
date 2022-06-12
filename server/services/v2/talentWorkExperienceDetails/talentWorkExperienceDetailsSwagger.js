const message = require('../../../locales/en');

module.exports = swaggerJson => {


    swaggerJson.paths['/v2/talent/work-experience'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Add a work experience at the beginning',
            summary: 'Add a work experience',
            parameters: [{
                in: 'formData',
                name: 'companyLogo',
                type: 'file',
                description: 'Upload company logo'
            },
            {
                in: 'formData',
                name: 'jobTitle',
                type: 'string',
                example: 'Software Engineer'
            },
            {
                in: 'formData',
                name: 'employmentType',
                type: 'string',
                example: 'Fulltime'
            },
            {
                in: 'formData',
                name: 'employer',
                type: 'string',
                example: 'codeMonk'
            },
            {
                in: 'formData',
                name: 'country',
                type: 'string',
                example: 'India'
            },
            {
                in: 'formData',
                name: 'startDate',
                type: 'string',
                example: '14/06/2019'
            },
            {
                in: 'formData',
                name: 'endDate',
                type: 'string',
                example: '14/06/2020'
            },
            {
                in: 'formData',
                name: 'shortDescription',
                type: 'string',
                example: 'I was software developer'
            },
            {
                in: 'formData',
                name: 'isPresent',
                type: 'boolean',
                example: true
            }],
            responses: {
                200: {
                    description: 'skills Updated',
                    schema: {
                        $ref: '#/definitions/successDetails'
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
                'Talent(v2)'
            ],
            description: 'Edit a work experience at give id',
            summary: 'Edit a project',
            parameters: [{
                in: 'formData',
                name: 'companyLogo',
                type: 'file',
                description: 'Upload company logo'
            },
            {
                in: 'formData',
                name: '_id',
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            {
                in: 'formData',
                name: 'jobTitle',
                type: 'string',
                example: 'Software Engineer'
            },
            {
                in: 'formData',
                name: 'employmentType',
                type: 'string',
                example: 'Fulltime'
            },
            {
                in: 'formData',
                name: 'employer',
                type: 'string',
                example: 'codeMonk'
            },
            {
                in: 'formData',
                name: 'country',
                type: 'string',
                example: 'India'
            },
            {
                in: 'formData',
                name: 'startDate',
                type: 'string',
                example: '14/06/2019'
            },
            {
                in: 'formData',
                name: 'endDate',
                type: 'string',
                example: '14/06/2020'
            },
            {
                in: 'formData',
                name: 'shortDescription',
                type: 'string',
                example: 'I was software developer'
            },
            {
                in: 'formData',
                name: 'isPresent',
                type: 'boolean',
                example: true
            }],
            responses: {
                200: {
                    description: 'skills Updated',
                    schema: {
                        $ref: '#/definitions/successDetails'
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
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Delete a work experience of give id',
            summary: 'Delete a project',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteWorkExperience'
                }
            }],
            responses: {
                200: {
                    description: 'skills Updated',
                    schema: {
                        $ref: '#/definitions/successDetails'
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

    swaggerJson.definitions.successDetails = {
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
