const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/bot/job-post/send'] = {
        post: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Webhook Api(v2)'
            ],
            parameters: [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'notification parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/sendJobPostNotificationPayload'
                    }
                }
            ],
            description: 'Send a job post notification',
            summary: 'Send a job post notification',
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

    swaggerJson.definitions.sendJobPostNotificationPayload = {
        'type': 'object',
        'properties': {
            'title': {
                'type': 'string',
                'example': 'QA Analyst - Intermediate'
            },
            'description': {
                'type': 'string',
                'example': 'Manual Testing experience of 5-6 years especially in Web products.\nGood in writing different scenarios/test cases, edge cases, positive and negative workflows.\nGood in writing SQL queries for data testing.\nGood understanding of Performance and Security standards applicable in Websites.\nGood understanding of Agile Methodogies - Scrum. Working experience in Jira for Task and Bug management.\nNice to have Automation and API testing experience.\nNice to have Health domain experience.'
            },
            'url': {
                'type': 'string',
                'example': 'https://dashboard.codemonk.ai/talent/brief-detail/61dbee99d3d10b6cb1f1bda9'
            },
            'send': {
                'type': 'boolean',
                'example': 'false'
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

    return swaggerJson;
};
