const message = require('../../../locales/en');

module.exports = (swaggerJson) => {

    swaggerJson.paths['/v2/auth/talent/signup'] = {
        'post': {
            'tags': [
                'Authentication(v2)'
            ],
            'description': 'Talent user sign up',
            'summary': 'Talent user sign up',
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
                'example': 'developer@mailinator.com'
            },
            'password': {
                'type': 'string',
                'example': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
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
