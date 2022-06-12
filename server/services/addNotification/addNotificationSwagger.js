const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/notification'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Notification'
            ],
            description: 'Add project by client',
            summary: 'Add project by client user',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/addNotification'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Update client user billing details',
                    schema: {
                        $ref: '#/definitions/successAddNotification'
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

    swaggerJson.definitions.addNotification = {
        type: 'object',
        properties: {
            notificationType: 'BRIEF_ADDEDD'
        }
    };

    swaggerJson.definitions.successAddNotification = {
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

    swaggerJson.definitions.editNotification = {
        type: 'object',
        properties: {
            projectId: {
                type: 'string',
                example: 'some project id'
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
            }
        }
    };

    swaggerJson.definitions.successEditNotification = {
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
