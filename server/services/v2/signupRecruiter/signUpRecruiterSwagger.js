const message = require('../../../locales/en');

module.exports = (swaggerJson) => {

    swaggerJson.paths['/v2/auth/recruiter/signup'] = {
        'post': {
            'tags': [
                'Authentication(v2)'
            ],
            'description': 'Recruiter user sign up',
            'summary': 'Recruiter user sign up',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userSignUp'
                    }
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successUserRegister'
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


    swaggerJson.definitions.errorBadRequest = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.INVALID_REQUEST
            }
        }
    };

    swaggerJson.definitions.errorUserRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ALREADY_REGISTER
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

    swaggerJson.definitions.userSignUp = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'brankostar@hotmail.com'
            },
            'password': {
                'type': 'string',
                'example': 'd2e1e34b17b299288d927e636bb9d891aa2feff88d69148c81ad88cb75dd188b'
            }
        }
    };

    swaggerJson.definitions.successUserRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.REGISTER_SUCCESS
            }
        }
    };

    return swaggerJson;
};
