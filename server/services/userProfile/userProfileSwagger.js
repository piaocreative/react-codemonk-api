const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/user/checkurl'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Validate social url',
            summary: 'Validate social url',
            parameters: [{
                in: 'query',
                name: 'url',
                description: 'Query parameter',
                required: true,
                schema: {
                    url: 'https://github.com/hitesh1986in'
                }
            }],
            responses: {
                200: {
                    description: 'Validate social url',
                    schema: {
                        $ref: '#/definitions/success'
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

    swaggerJson.paths['/user/details'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Step wise user Details',
            summary: 'Step wise user Details',
            parameters: [],
            responses: {
                200: {
                    description: 'Professional details get',
                    schema: {
                        $ref: '#/definitions/success'
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

    swaggerJson.paths['/user/picture'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Upload Profile Picture',
            summary: 'Upload Profile Picture',
            parameters: [{
                in: 'formData',
                name: 'photo',
                type: 'file',
                description: 'Upload Profile Picture',
                required: true
            },
            {
                in: 'formData',
                name: 'talentId',
                description: 'Talent id in case of agency update pic'
            }],
            responses: {
                200: {
                    description: 'Profile picture uploaded file',
                    schema: {
                        $ref: '#/definitions/successUploadProfilePicture'
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
                'User'
            ],
            description: 'Delete Profile Picture',
            summary: 'Delete Profile Picture',
            parameters: [],
            responses: {
                200: {
                    description: 'Profile picture delete file',
                    schema: {
                        $ref: '#/definitions/successDeleteProfilePicture'
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

    swaggerJson.paths['/user/password'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Change user password',
            summary: 'Change user password',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/changePassword'
                }
            }],
            responses: {
                200: {
                    description: 'Change user password',
                    schema: {
                        $ref: '#/definitions/successChangePassword'
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

    swaggerJson.definitions.personalDetails = {
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
            },
            city: {
                type: 'string',
                example: 'Ahmedabad'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            language: {
                type: 'Array',
                example: [{
                    name: 'en',
                    rate: 8
                },
                {
                    name: 'fr',
                    rate: 5
                }]
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            }

        }
    };

    swaggerJson.definitions.changePassword = {
        type: 'object',
        properties: {
            oldPassword: {
                type: 'string',
                example: 'Talent'
            },
            newPassword: {
                type: 'string',
                example: 'Last'
            }
        }
    };

    swaggerJson.definitions.successUploadProfilePicture = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    profilePicture: 's3url'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successPersonalData = {
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

    swaggerJson.definitions.successDeleteProfilePicture = {
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

    swaggerJson.definitions.success = {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successChangePassword = {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            message: {
                example: message.CHANGE_PASSWORD_SUCCESS
            }
        }
    };

    return swaggerJson;
};
