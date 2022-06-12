const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/talent/project-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent(v2)'
            ],
            'description': 'Update project details',
            'summary': 'Update project details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/projectDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update project details',
                    'schema': {
                        '$ref': '#/definitions/successprojectDetails'
                    }
                },
                400: {
                    'description': 'Invalid request',
                    'schema': {
                        '$ref': '#/definitions/validationError'
                    }
                },
                '401': {
                    'description': 'Unauthorized Access',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                '500': {
                    'description': 'Something went wrong. Try again.',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
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

    swaggerJson.definitions.projectDetails = {
        'type': 'object',
        'properties': {
            'projectDetails': {
                'type': 'array',
                'example': [{
                    name: 'CodeMonk',
                    url: 'http://www.codemonk.ai',
                    description: 'This is for devlopers',
                    role: 'Developer',
                    keyAchievements: 'I delivered the sprint 1 and sprint 2 on time'
                }]
            }
        }
    };

    swaggerJson.definitions.successprojectDetails = {
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
