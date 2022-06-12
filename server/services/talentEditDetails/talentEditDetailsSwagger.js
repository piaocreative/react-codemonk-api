const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/profile'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit profile details',
            summary: 'edit profile details',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editProfile'
                }
            }],
            responses: {
                200: {
                    description: 'Edit Profile Details',
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

    swaggerJson.paths['/talent/summary'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit profile professional summary brief',
            summary: 'edit profile professional summary brief',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editSummary'
                }
            }],
            responses: {
                200: {
                    description: 'Edit Profile Details',
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

    swaggerJson.paths['/talent/rate'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit profile currency and rate',
            summary: 'edit profile currency and rate',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editRate'
                }
            }],
            responses: {
                200: {
                    description: 'Edit Profile Details',
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

    swaggerJson.paths['/talent/skills'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit skills',
            summary: 'edit skills',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editSkills'
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

    swaggerJson.paths['/talent/professional-url'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit professional url',
            summary: 'edit professional url',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editUrl'
                }
            }],
            responses: {
                200: {
                    description: 'Url Updated',
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

    swaggerJson.paths['/talent/preferences'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit preferences',
            summary: 'edit preferences',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editPreferences'
                }
            }],
            responses: {
                200: {
                    description: 'Url Updated',
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

    swaggerJson.paths['/talent/availability'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit availability',
            summary: 'edit availability',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editAvailability'
                }
            }],
            responses: {
                200: {
                    description: 'Url Updated',
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

    swaggerJson.paths['/talent/project'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Add a project details at the beginning',
            summary: 'Add a project',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/addProjectTalent'
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Edit a project details for give id',
            summary: 'Edit a project',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editProjectTalent'
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
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Delete a project details of give id',
            summary: 'Delete a project',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteProject'
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

    swaggerJson.paths['/talent/education'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Add a education details at the beginning',
            summary: 'Add a education',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/addEducation'
                }
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
                'Talent'
            ],
            description: 'Edit a education details at the beginning',
            summary: 'Edit a education',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editEducation'
                }
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
                'Talent'
            ],
            description: 'Delete a education details at the beginning',
            summary: 'Delete a education',
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

    swaggerJson.paths['/talent/work-experience'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Add a work experience at the beginning',
            summary: 'Add a work experience',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/addWorkExperience'
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Edit a work experience at give id',
            summary: 'Edit a project',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editWorkExperience'
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
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
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

    swaggerJson.paths['/talent/certificate'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Add a certificate details at the beginning',
            summary: 'Add a certificate',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/addCertificate'
                }
            }],
            responses: {
                200: {
                    description: 'certificate Added',
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
                'Talent'
            ],
            description: 'Edit a certificate details at the beginning',
            summary: 'Edit a certificate',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editCertificate'
                }
            }],
            responses: {
                200: {
                    description: 'certificate Updated',
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
                'Talent'
            ],
            description: 'Delete a certificate details at the beginning',
            summary: 'Delete a certificate',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteCertificate'
                }
            }],
            responses: {
                200: {
                    description: 'certificate deleted',
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

    swaggerJson.paths['/talent/billing'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit billing',
            summary: 'edit billing',
            consumes: 'application/x-www-form-urlencoded',
            produces: ['application/xml', 'application/json'],
            parameters: [{
                in: 'formData',
                name: 'idProof',
                type: 'file',
                description: 'Upload documents user identity proof'
            },
            {
                in: 'formData',
                name: 'addressProof',
                type: 'file',
                description: 'Upload documents user address proof'
            },
            {
                in: 'formData',
                name: 'companyIncorporationCertificateUrl',
                type: 'file',
                description: 'Upload documents user company incorporation certificate proof'
            },
            {
                in: 'formData',
                name: 'companyVatRegistrationCertificateUrl',
                type: 'file',
                description: 'Upload documents user compnay vat registration certificate proof'
            },
            {
                in: 'formData',
                name: 'companyInsuranceDocumentUrl',
                type: 'file',
                description: 'Upload documents user company insurance certificate proof'
            },
            {
                in: 'formData',
                name: 'billingType',
                type: 'string',
                required: true,
                description: 'can be either from two options \'compnay\' or \'freelancer\''
            },
            {
                in: 'formData',
                name: 'companyName',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyregisteredNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyPincode',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyCity',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyCountry',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyAddressLineOne',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyAddressLineTwo',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'website',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'vatNumber',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'companyProfessionInsuranceValue',
                type: 'number'
            },
            {
                in: 'formData',
                name: 'companyPublicInsurancesValue',
                type: 'number'
            },
            {
                in: 'formData',
                name: 'companyEmployerInsuranceValue',
                type: 'number'
            }],
            responses: {
                200: {
                    description: 'billing Updated',
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

    swaggerJson.paths['/talent/payment'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'edit payment',
            summary: 'edit payment',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editPayment'
                }
            }],
            responses: {
                200: {
                    description: 'payment Updated',
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

    swaggerJson.paths['/talent/languages'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'Edit languages',
            summary: 'Edit languages',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/editLanguages'
                }
            }],
            responses: {
                200: {
                    description: 'Languages Updated',
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

    swaggerJson.definitions.editUrl = {
        type: 'object',
        properties: {
            linkedInUrl: {
                type: 'string',
                example: 'https://www.linkedin.com/in/williamhgates'
            },
            gitHubUrl: {
                type: 'string',
                example: 'https://github.com/bill-gates'
            },
            stackOverFlowUrl: {
                type: 'string',
                example: 'https://stackoverflow.com/users/22656/jon-skeet'
            }
        }
    };

    swaggerJson.definitions.editSkills = {
        type: 'object',
        properties: {
            skills: {
                type: 'Array',
                example: [{
                    name: 'Node',
                    rate: 7
                },
                {
                    name: 'NoSQL',
                    rate: 7
                }]
            }
        }
    };

    swaggerJson.definitions.editPreferences = {
        type: 'object',
        properties: {
            teamPreference: {
                type: 'Array',
                example: ['individuals']
            },
            assignments: {
                type: 'Array',
                example: ['occational-site-visit']
            },
            workPreference: {
                type: 'array',
                example: ['fulltime']
            }
        }
    };

    swaggerJson.definitions.editAvailability = {
        type: 'object',
        properties: {
            availability: {
                type: 'boolean',
                example: true
            },
            unavailability: {
                type: 'Array',
                example: [{
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'full'
                },
                {
                    date: '2020-04-07T05:16:08.717Z',
                    key: 'first'
                },
                {
                    date: '2020-04-08T05:16:08.717Z',
                    key: 'second'
                }]
            }
        }
    };

    swaggerJson.definitions.editProfile = {
        type: 'object',
        properties: {
            firstName: {
                type: 'string',
                example: 'Talent'
            },
            lastName: {
                type: 'string',
                example: 'Last'
            },
            primaryRole: {
                type: 'string',
                example: 'Developer'
            },
            yearsOfExperience: {
                type: 'string',
                example: 'Beginner - 0 - 2 yrs'
            },
            city: {
                type: 'string',
                example: 'Ahmedabad'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            countryCode: {
                type: 'string',
                example: '91'
            },
            phoneNumber: {
                type: 'string',
                example: '9925061220'
            },
            dob: {
                type: 'string',
                example: '31/08/1986'
            },
            gender: {
                type: 'string',
                example: 'Male'
            },
            postcode: {
                type: 'string',
                example: '380015'
            },
            addressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding'
            },
            addressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            }
        }
    };

    swaggerJson.definitions.editSummary = {
        type: 'object',
        properties: {
            professionalSummary: {
                type: 'string',
                example: 'hello this is testing'
            }
        }
    };

    swaggerJson.definitions.editRate = {
        type: 'object',
        properties: {
            currency: {
                type: 'string',
                example: 'USD'
            },
            ratePerHour: {
                type: 'number',
                example: 40
            }
        }
    };

    swaggerJson.definitions.addProjectTalent = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                example: 'CodeMonk'
            },
            url: {
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            description: {
                type: 'string',
                example: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
            },
            role: {
                type: 'string',
                example: 'Developer'
            },
            keyAchievements: {
                type: 'string',
                example: 'I delivered the sprint 1 and sprint 2 on time'
            }
        }
    };

    swaggerJson.definitions.editProjectTalent = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            name: {
                type: 'string',
                example: 'CodeMonk'
            },
            url: {
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            description: {
                type: 'string',
                example: 'The standard chunk of Lorem Ipsum used since the 1500s. This is for devlopers'
            },
            role: {
                type: 'string',
                example: 'Developer'
            },
            keyAchievements: {
                type: 'string',
                example: 'I delivered the sprint 1 and sprint 2 on time'
            }
        }
    };

    swaggerJson.definitions.deleteProject = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
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

    swaggerJson.definitions.addWorkExperience = {
        type: 'object',
        properties: {
            'jobTitle': {
                type: 'string',
                example: 'Software Engineer'
            },
            'employmentType': {
                type: 'string',
                example: 'Fulltime'
            },
            'employer': {
                type: 'string',
                example: 'codemonk'
            },
            'country': {
                type: 'string',
                example: 'India'
            },
            'startDate': {
                type: 'string',
                example: '14/06/2019'
            },
            'endDate': {
                type: 'string',
                example: '14/06/2020'
            },
            'shortDescription': {
                type: 'string',
                example: 'I was software developer'
            },
            isPresent: {
                type: 'boolean',
                example: true
            }
        }
    };

    swaggerJson.definitions.editWorkExperience = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            'jobTitle': {
                type: 'string',
                example: 'Software Engineer'
            },
            'employmentType': {
                type: 'string',
                example: 'Fulltime'
            },
            'employer': {
                type: 'string',
                example: 'codemonk'
            },
            'country': {
                type: 'string',
                example: 'India'
            },
            'startDate': {
                type: 'string',
                example: '14/06/2019'
            },
            'endDate': {
                type: 'string',
                example: '14/06/2020'
            },
            'shortDescription': {
                type: 'string',
                example: 'I was software developer'
            },
            isPresent: {
                type: 'boolean',
                example: true
            }
        }
    };

    swaggerJson.definitions.deleteWorkExperience = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            }
        }
    };


    swaggerJson.definitions.addCertificate = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                example: 'AWS Solution Architect'
            },
            dateObtained: {
                type: 'Date',
                example: '30/08/2019'
            },
            issuedBy: {
                type: 'string',
                example: 'Amazon'
            },
            certificateId: {
                type: 'string',
                example: 'ABC123'
            }
        }
    };

    swaggerJson.definitions.editCertificate = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            name: {
                type: 'string',
                example: 'AWS Solution Architect 2'
            },
            dateObtained: {
                type: 'Date',
                example: '30/08/2019'
            },
            issuedBy: {
                type: 'string',
                example: 'Amazon'
            },
            certificateId: {
                type: 'string',
                example: 'ABC123'
            }
        }
    };

    swaggerJson.definitions.deleteCertificate = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            }
        }
    };

    swaggerJson.definitions.editPayment = {
        'type': 'object',
        'properties': {
            payType: {
                type: 'string',
                example: 'bank' // You can pass paypal for paypal option
            },
            bankName: {
                type: 'string',
                example: 'Kotak'
            },
            bankAccountNumber: {
                type: 'string',
                example: 'ABC'
            },
            bankCode: {
                type: 'string',
                example: 'KT11234'
            },
            oldPassword: {
                type: 'string',
                example: 'QWR123@W'
            }
        }
    };

    swaggerJson.definitions.editLanguages = {
        'type': 'object',
        'properties': {
            'languages': {
                'type': 'Array',
                'example': [
                    {
                        'name': 'en',
                        'rate': 7
                    },
                    {
                        'name': 'fr',
                        'rate': 9
                    }
                ]
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
