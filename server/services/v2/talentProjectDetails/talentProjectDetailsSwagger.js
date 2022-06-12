const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/project'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'Add a project details at the beginning',
            summary: 'Add a project',
            parameters: [
                {
                    in: 'formData',
                    name: 'projectImages',
                    type: 'file',
                    description: 'Upload project logo'
                },
                {
                    in: 'formData',
                    name: 'projectImages',
                    type: 'file',
                    description: 'Upload project logo'
                },
                {
                    in: 'formData',
                    name: 'name',
                    type: 'string',
                    example: 'CodeMonk',
                    default: 'CodeMonk'
                },
                {
                    in: 'formData',
                    name: 'url',
                    type: 'string',
                    example: 'http://www.codemonk.ai',
                    default: 'http://www.codemonk.ai'
                },
                {
                    in: 'formData',
                    name: 'description',
                    type: 'string',
                    example: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
                    , default: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
                },
                {
                    in: 'formData',
                    name: 'role',
                    type: 'string',
                    example: 'Developer',
                    default: 'Developer'
                },
                {
                    in: 'formData',
                    name: 'employer',
                    type: 'string',
                    example: 'CodeMonk',
                    default: 'CodeMonk'
                },
                {
                    in: 'formData',
                    name: 'industry',
                    type: 'string',
                    example: 'Accounting',
                    default: 'Accounting'
                },
                {
                    in: 'formData',
                    name: 'skills',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', default: 'Node' },
                            rate: { type: 'number', default: 7 }
                        }
                    },
                    example: `[{name:'Node',rate:8}]`
                },
                {
                    in: 'formData',
                    name: 'images',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', default: 'logo.png' },
                            isCoverImage: { type: 'boolean', default: false }
                        }
                    },
                    example: `[{name:'logo.png',isCoverImage:false}]`
                },
                {
                    in: 'formData',
                    name: 'employmentType',
                    type: 'string',
                    example: 'Fulltime'
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
            description: 'Edit a project details for give id',
            summary: 'Edit a project',
            parameters: [{
                in: 'formData',
                name: 'projectImage',
                type: 'array',
                items: {
                    type: 'file'
                },
                description: 'Upload project logo'
            },
            {
                in: 'formData',
                name: '_id',
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            },
            {
                in: 'formData',
                name: 'name',
                type: 'string',
                example: 'CodeMonk'
            },
            {
                in: 'formData',
                name: 'url',
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            {
                in: 'formData',
                name: 'description',
                type: 'string',
                example: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
            },
            {
                in: 'formData',
                name: 'role',
                type: 'string',
                example: 'Developer'
            },
            {
                in: 'formData',
                name: 'employer',
                type: 'string',
                example: 'CodeMonk',
                default: 'CodeMonk'
            },
            {
                in: 'formData',
                name: 'industry',
                type: 'string',
                example: 'Accounting',
                default: 'Accounting'
            },
            {
                in: 'formData',
                name: 'skills',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', default: 'Node' },
                        rate: { type: 'number', default: 7 }
                    }
                },
                example: `[{name:'Node',rate:8}]`
            },
            {
                in: 'formData',
                name: 'images',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', default: 'logo.png' },
                        isCoverImage: { type: 'boolean', default: false }
                    }
                },
                example: `[{name:'logo.png',isCoverImage:false}]`
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

    swaggerJson.definitions.deleteProject = {
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
