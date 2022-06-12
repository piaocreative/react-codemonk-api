const message = require('../../locales/en');

module.exports = (swaggerJson) => {

    swaggerJson.paths['/auth/signup'] = {
        'post': {
            'tags': [
                'Authentication'
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

    swaggerJson.paths['/auth/client/signup'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Client user sign up',
            'summary': 'Client user sign up',
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

    swaggerJson.paths['/auth/agency/talent/email'] = {
        'get': {
            'tags': [
                'Authentication'
            ],
            'description': 'Get agency talent email using token.',
            'summary': 'Get agency talent email using token.',
            'parameters': [{
                'in': 'query',
                'name': 'token',
                'description': 'Token for signup'
            }],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successAgencyrTalentEmail'
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

    swaggerJson.paths['/auth/agency/talent/signup'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Client user sign up',
            'summary': 'Client user sign up',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/agencySignUp'
                    }
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successAgencyrRegister'
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

    swaggerJson.paths['/auth/verify-account'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'User name verification',
            'summary': 'User name verification',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userVerify'
                    }
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successVerifyUser'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
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

    swaggerJson.paths['/auth/resend-otp'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'To resend OTP',
            'summary': 'To resend OTP in case of email is not recieved in the first attempt',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/resendOTP'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successResendOTP'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                '422': {
                    'description': 'User already register',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
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

    swaggerJson.definitions.agencySignUp = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'developer@mailinator.com'
            },
            'password': {
                'type': 'string',
                'example': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            },
            'token': {
                'type': 'string',
                'example': '5f523e4a7e416a76f64ea920'
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

    swaggerJson.definitions.successAgencyrRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successAgencyrTalentEmail = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.SUCCESS
            },
            data: {
                type: 'string',
                example: 'test@example.com'
            }
        }
    };

    swaggerJson.definitions.userVerify = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'developer@mailinator.com'
            },
            'otp': {
                'type': 'number',
                'example': 123456
            }
        }
    };

    swaggerJson.definitions.successVerifyUser = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.USER_VERIFY_SUCCESS
            }
        }
    };

    swaggerJson.definitions.resendOTP = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'developer@mailinator.com'
            }
        }
    };

    swaggerJson.definitions.successResendOTP = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.RESEND_OTP_SUCCESS
            }
        }
    };

    return swaggerJson;
};
