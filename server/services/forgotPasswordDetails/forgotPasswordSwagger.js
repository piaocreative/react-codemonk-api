module.exports = (swaggerJson) => {
    swaggerJson.paths['/auth/forgot-password'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Forgot password',
            'summary': 'Forgot password',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'authentication parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userForgotPassword'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Please check your email for password reset link',
                    'schema': {
                        '$ref': '#/definitions/successForgotPassword'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorForgotPassword'
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

    swaggerJson.paths['/auth/verify-token'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Verify reset password token',
            'summary': 'Verify reset password token',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'authentication parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userVerifyToken'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Link validated successfully.',
                    'schema': {
                        '$ref': '#/definitions/successVerifyToken'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorVerifyToken'
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

    swaggerJson.paths['/auth/reset-password'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Change password',
            'summary': 'Change password',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'authentication parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userResetPassword'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Password updated successfully',
                    'schema': {
                        '$ref': '#/definitions/successResetPassword'
                    }
                },
                '400': {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/passwordInvalid'
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

    swaggerJson.definitions.userForgotPassword = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'test231@mailinator.com'
            }
        }
    };

    swaggerJson.definitions.userVerifyToken = {
        'type': 'object',
        'properties': {
            'token': {
                'type': 'string',
                'example': '4hoR8EAXYEbT'
            }
        }
    };

    swaggerJson.definitions.userResetPassword = {
        'type': 'object',
        'properties': {
            'token': {
                'type': 'string',
                'example': '4hoR8EAXYEbT'
            },
            password: {
                'type': 'string',
                'example': 'SHA256 encripted password'
            }
        }
    };

    swaggerJson.definitions.passwordInvalid = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': 'Please enter password.'
            }
        }
    };

    swaggerJson.definitions.errorForgotPassword = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': 'Please enter email address'
            }
        }
    };

    swaggerJson.definitions.successForgotPassword = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': 'An email has been sent. Please follow instrcutions on it.'
            }
        }
    };

    swaggerJson.definitions.successVerifyToken = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': 'Link validated successfully.'
            }
        }
    };

    swaggerJson.definitions.errorVerifyToken = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': 'Link has expired, kindly reset password again'
            }
        }
    };
    swaggerJson.definitions.successResetPassword = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': 'Password updated successfully'
            }
        }
    };
    return swaggerJson;
};
