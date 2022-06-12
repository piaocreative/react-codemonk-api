/**
  * Created by Innovify on 09/12/2020
  * @name Sign In Swagger
  */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {
    swaggerJson.paths['/admin/proxy-login'] = {
        'post': {
            'tags': [
                'Admin'
            ],
            'security': [{
                'bearerAuth': []
            }],
            'description': 'Log in via admin token and user id',
            'summary': 'Log in via admin token and user id',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'authentication parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/usersignIn'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'You have successfully logged in.',
                    'schema': {
                        '$ref': '#/definitions/successRegister'
                    }
                },
                '400': {
                    'description': 'Bad Request',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccessEmail'
                    }
                },
                '500': {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.usersignIn = {
        'type': 'object',
        'properties': {
            'userId': {
                'type': 'string',
                'example': '5f4e0dcbae932622307694d1'
            }
        }
    };

    swaggerJson.definitions.successRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            }, 'data': {
                type: 'object',
                example: {
                    'firstName': 'Sam',
                    'lastName': 'Jones',
                    'username': 'researcher@mailinator.com',
                    'role': 'Researcher',
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzMjFAbWFpbGluYXRvci5jb20iLCJpYXQiOjE1MjU0MzM3NDUsImV4cCI6MTU1Njk2OTc0NX0.uN6n5nOs_bQnEbks9CrTgk_MBIGhiBV7JIsMJ371q0A'
                }
            },
            'message': {
                'example': message.LOGIN_SUCCESS
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccessEmail = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.LOGIN_FAILED
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


    return swaggerJson;
};
