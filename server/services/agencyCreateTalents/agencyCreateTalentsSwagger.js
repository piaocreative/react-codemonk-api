const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/talents-invite'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Create and invite talents that agency added earlier',
            summary: 'Create and invite talents that agency added earlier',
            responses: {
                200: {
                    description: 'Update project details',
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

    swaggerJson.paths['/agency/talent'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Invite talent against agency added earlier',
            summary: 'Invite talent against agency added earlier',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Add talents array',
                required: true,
                schema: {
                    $ref: '#/definitions/createTalent'
                }
            }],
            responses: {
                200: {
                    description: 'Update project details',
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
        },
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Edit agency talent',
            summary: 'Edit agency talent',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Add talents array',
                required: true,
                schema: {
                    $ref: '#/definitions/editTalent'
                }
            }],
            responses: {
                200: {
                    description: 'Update project details',
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
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            description: 'Delete talent of agency',
            summary: 'Delete talent of agency',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Delete talent',
                required: true,
                schema: {
                    $ref: '#/definitions/deleteTalent'
                }
            }],
            responses: {
                200: {
                    description: 'Delete talent',
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

    swaggerJson.definitions.createTalent = {
        type: 'object',
        properties: {
            firstName: {
                type: 'string',
                example: 'Talent One'
            },
            lastName: {
                type: 'string',
                example: 'Talent Last One'
            },
            email: {
                type: 'string',
                example: 'talent1@mailinator.com'
            },
            currency: {
                type: 'string',
                example: 'USD'
            },
            rate: {
                type: 'number',
                example: 40
            }
        }
    };

    swaggerJson.definitions.editTalent = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: 'id of edit object'
            },
            firstName: {
                type: 'string',
                example: 'Talent One'
            },
            lastName: {
                type: 'string',
                example: 'Talent Last One'
            },
            currency: {
                type: 'string',
                example: 'USD'
            },
            rate: {
                type: 'number',
                example: 400
            }
        }
    };

    swaggerJson.definitions.deleteTalent = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: ''
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

    swaggerJson.definitions.success = {
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
