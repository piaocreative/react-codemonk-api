const message = require('../../../locales/en.json');

module.exports = (swaggerJson) => {
    swaggerJson.paths['/auth/ambassador/signup'] = {
        'post': {
            'tags': [
                'Authentication',
                'Ambassador'
            ],
            'description': 'Ambassador user sign up',
            'summary': 'Ambassador user sign up',
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

    return swaggerJson;
};
