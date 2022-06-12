const message = require('../../../locales/en');

module.exports = swaggerJson => {

    swaggerJson.paths['/v2/talent/education'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Add an education details at the beginning',
            summary: 'Add an education',
            parameters: [
            {
                in: 'formData',
                name: 'companyLogo',
                type: 'file',
                description: 'Upload company logo'
            },
            {
                in: 'formData',
                name: 'degreeLevel',
                type: 'string',
                example: 'Master’s or Higher'
            },
            {
                in: 'formData',
                name: 'degreeTitle',
                type: 'string',
                example: 'Master in Computer Application'
            },
            {
                in: 'formData',
                name: 'collegeName',
                type: 'string',
                example: 'IETE, New Delhi'
            },
            {
                in: 'formData',
                name: 'country',
                type: 'string',
                example: 'India'
            },
            {
                in: 'formData',
                name: 'startYear',
                type: 'number',
                example: '2019'
            },
            {
                in: 'formData',
                name: 'endYear',
                type: 'number',
                example: '2021'
            }],
            responses: {
                200: {
                    description: 'education Added',
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
            description: 'Edit an education details at the beginning',
            summary: 'Edit an education',
            parameters: [
            {
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
                name: 'degreeLevel',
                type: 'string',
                example: 'Master’s or Higher'
            },
            {
                in: 'formData',
                name: 'degreeTitle',
                type: 'string',
                example: 'Master in Computer Application'
            },
            {
                in: 'formData',
                name: 'collegeName',
                type: 'string',
                example: 'IETE, New Delhi'
            },
            {
                in: 'formData',
                name: 'country',
                type: 'string',
                example: 'India'
            },
            {
                in: 'formData',
                name: 'startYear',
                type: 'number',
                example: '2019'
            },
            {
                in: 'formData',
                name: 'endYear',
                type: 'number',
                example: '2021'
            }],
            responses: {
                200: {
                    description: 'education Updated',
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
            description: 'Delete an education details at the beginning',
            summary: 'Delete an education',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteEducation'
                }
            }],
            responses: {
                200: {
                    description: 'education deleted',
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

    swaggerJson.definitions.addEducation = {
        type: 'object',
        properties: {
            degreeLevel: {
                type: 'string',
                example: 'Master’s or Higher'
            },
            degreeTitle: {
                type: 'string',
                example: 'Master in Computer Application'
            },
            collegeName: {
                type: 'string',
                example: 'IETE, New Delhi'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            startYear: {
                type: 'number',
                example: '2029'
            },
            endYear: {
                type: 'number',
                example: '2021'
            }
        }
    };

    swaggerJson.definitions.editEducation = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            degreeLevel: {
                type: 'string',
                example: 'Master’s or Higher'
            },
            degreeTitle: {
                type: 'string',
                example: 'Master in Computer Application'
            },
            collegeName: {
                type: 'string',
                example: 'IETE, New Delhi'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            startYear: {
                type: 'number',
                example: '2029'
            },
            endYear: {
                type: 'number',
                example: '2021'
            }
        }
    };

    swaggerJson.definitions.deleteEducation = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
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
