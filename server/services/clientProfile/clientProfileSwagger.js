const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/client/phone-number'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Update client user phone number',
            'summary': 'Update client user phone number',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/clientPhone'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile phone number',
                    'schema': {
                        '$ref': '#/definitions/successClientPhone'
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

    swaggerJson.paths['/client/verify-phone-number'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'verify client user phone number',
            'summary': 'verify client user phone number',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/verifyClientPhone'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile phine number verify',
                    'schema': {
                        '$ref': '#/definitions/successClientPhone'
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

    swaggerJson.paths['/client/save-later'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Update client user profile partial save',
            'summary': 'Update client user profile partial save',
            'parameters': [
                {
                    in: 'formData',
                    name: 'step',
                    type: 'number',
                    example: 1,
                    required: true
                },
                {
                    in: 'formData',
                    name: 'firstName',
                    type: 'string',
                    example: 'Client\'s First'
                },
                {
                    in: 'formData',
                    name: 'lastName',
                    type: 'string',
                    example: 'Client\'s Last'
                },
                {
                    in: 'formData',
                    name: 'countryCode',
                    type: 'string',
                    example: '91'
                },
                {
                    in: 'formData',
                    name: 'phoneNumber',
                    type: 'string',
                    example: '9925461330'
                },
                {
                    in: 'formData',
                    name: 'jobTitle',
                    type: 'string',
                    example: 'CTO'
                },
                {
                    in: 'formData',
                    name: 'jobRole',
                    type: 'string',
                    example: 'hiring-manager'
                },
                {
                    in: 'formData',
                    name: 'logo',
                    type: 'file'
                },
                {
                    in: 'formData',
                    name: 'name',
                    type: 'string',
                    example: 'Joy story company'
                },
                {
                    in: 'formData',
                    name: 'brand',
                    type: 'string',
                    example: 'Hourse'
                },
                {
                    in: 'formData',
                    name: 'registeredNumber',
                    type: 'string',
                    example: '12345678'
                },
                {
                    in: 'formData',
                    name: 'vatNumber',
                    type: 'string',
                    example: '112233'
                },
                {
                    in: 'formData',
                    name: 'industry',
                    type: 'string',
                    example: ['Accounting']
                },
                {
                    in: 'formData',
                    name: 'companyType',
                    type: 'string',
                    example: ['start-up']
                },
                {
                    in: 'formData',
                    name: 'cultures',
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    example: ['Quality', 'Trust']
                },
                {
                    in: 'formData',
                    name: 'portfolioUrl',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'linkedInUrl',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'gitHubUrl',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'stackOverFlowUrl',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'behanceUrl',
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'dribbbleUrl',
                    type: 'string'
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile partial save',
                    'schema': {
                        '$ref': '#/definitions/successClientProfileSaveLater'
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

    swaggerJson.paths['/client/profile'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Update client user profile details',
            'summary': 'Update client user profile details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/clientProfile'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile details',
                    'schema': {
                        '$ref': '#/definitions/successClientProfile'
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

    swaggerJson.paths['/client/about-you'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Update client about you details',
            'summary': 'Update client about you details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/clientAboutYou'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile details',
                    'schema': {
                        '$ref': '#/definitions/successClientAboutYou'
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

    swaggerJson.paths['/client/about-company'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Client'
            ],
            description: 'Add company detail',
            summary: 'Add company detail',
            parameters: [{
                in: 'formData',
                name: 'logo',
                type: 'file'
            },
            {
                in: 'formData',
                name: 'name',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'brand',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'registeredNumber',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'vatNumber',
                type: 'string',
                required: true
            },
            {
                in: 'formData',
                name: 'industry',
                type: 'string',
                example: 'Accounting',
                required: true
            },
            {
                in: 'formData',
                name: 'companyType',
                type: 'string',
                example: 'start-up',
                required: true
            },
            {
                in: 'formData',
                name: 'cultures',
                type: 'array',
                items: {
                    type: 'string'
                },
                example: ['Quality', 'Trust'],
                required: true
            },
            {
                in: 'formData',
                name: 'portfolioUrl',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'linkedInUrl',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'gitHubUrl',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'stackOverFlowUrl',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'behanceUrl',
                type: 'string'
            },
            {
                in: 'formData',
                name: 'dribbbleUrl',
                type: 'string'
            }],
            responses: {
                200: {
                    description: 'Upload Company Detail',
                    schema: {
                        $ref: '#/definitions/successClientAboutCompany'
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

    swaggerJson.paths['/client/company-location'] = {
        'post': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Add company location',
            'summary': 'Add company location',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/clientCompanyLocation'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile details',
                    'schema': {
                        '$ref': '#/definitions/successClientAboutYou'
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
        },
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Update company location',
            'summary': 'Update company location',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/clientCompanyLocationEdit'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile details',
                    'schema': {
                        '$ref': '#/definitions/successClientAboutYou'
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
        },
        'delete': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            'description': 'Delete company location',
            'summary': 'Delete company location',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/deleteClientCompanyLocation'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update client user profile details',
                    'schema': {
                        '$ref': '#/definitions/successClientAboutYou'
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

    swaggerJson.definitions.clientPhone = {
        'type': 'object',
        'properties': {
            countryCode: {
                type: 'string',
                example: '91'
            },
            phoneNumber: {
                type: 'string',
                example: '9925461330'
            }
        }
    };

    swaggerJson.definitions.verifyClientPhone = {
        'type': 'object',
        'properties': {
            otp: {
                type: 'number',
                example: 123456
            }
        }
    };

    swaggerJson.definitions.clientProfile = {
        'type': 'object',
        'properties': {
            firstName: {
                type: 'string',
                example: 'Client\'sFirst'
            },
            lastName: {
                type: 'string',
                example: 'Client\'s Last'
            },
            jobTitle: {
                type: 'string',
                example: 'CTO'
            },
            postcode: {
                type: 'string',
                example: '380015'
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            addressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding'
            },
            addressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            city: {
                type: 'string',
                example: 'Ahmedabad'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            companyName: {
                type: 'string',
                example: 'Soft Silicon'
            },
            companyregisteredNumber: {
                type: 'string',
                example: 'ABC'
            },
            companyPincode: {
                type: 'string',
                example: '380015'
            },
            companyCity: {
                type: 'string',
                example: 'Ahmedabad'
            },
            companyCountry: {
                type: 'string',
                example: 'India'
            },
            companyAddressLineOne: {
                type: 'string',
                example: 'Some Building'
            },
            companyAddressLineTwo: {
                type: 'string',
                example: 'Some Stree'
            },
            website: {
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            vatNumber: {
                type: 'string',
                example: 'ABC'
            },
            authorityFirstName: {
                type: 'string',
                example: 'Authority\'sFirst'
            },
            authorityLastName: {
                type: 'string',
                example: 'authority\'s Last'
            },
            authorityEmail: {
                type: 'string',
                example: 'authrity@example.com'
            },
            authorityCountryCode: {
                type: 'string',
                example: '91'
            },
            authorityPhoneNumber: {
                type: 'string',
                example: '9925061220'
            },
            authorityJobTitle: {
                type: 'string',
                example: 'CEO'
            },
            authorityPostcode: {
                type: 'string',
                example: '380015'
            },
            authorityTimeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            authorityAddressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding'
            },
            authorityAddressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            authorityCity: {
                type: 'string',
                example: 'Ahmedabad'
            },
            authorityCountry: {
                type: 'string',
                example: 'India'
            }
        }
    };

    swaggerJson.definitions.deleteClientCompanyLocation = {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c'
            }
        }
    };

    swaggerJson.definitions.clientAboutYou = {
        'type': 'object',
        'properties': {
            firstName: {
                type: 'string',
                example: 'Client\'s First'
            },
            lastName: {
                type: 'string',
                example: 'Client\'s Last'
            },
            countryCode: {
                type: 'string',
                example: '91'
            },
            phoneNumber: {
                type: 'string',
                example: '9925461330'
            },
            jobTitle: {
                type: 'string',
                example: 'CTO'
            },
            jobRole: {
                type: 'string',
                example: 'hiring-manager',
                description: "['recruitment-manager','hiring-manager','blling-admin']"
            }
        }
    };

    swaggerJson.definitions.clientCompanyLocation = {
        'type': 'object',
        'properties': {
            locationName: {
                type: 'string',
                example: 'Subsidary',
                required: true
            },
            postcode: {
                type: 'string',
                example: '380015',
                required: true
            },
            country: {
                type: 'string',
                example: 'India',
                required: true
            },
            addressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding',
                required: true
            },
            addressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            city: {
                type: 'string',
                example: 'Ahmedabad',
                required: true
            },
            state: {
                type: 'string',
                example: 'Gujarat'
            },
            timezone: {
                type: 'string',
                example: 'Asia/Kolkata',
                required: true
            }
        }
    };
    swaggerJson.definitions.clientCompanyLocationEdit = {
        'type': 'object',
        'properties': {
            _id: {
                type: 'string',
                example: '5ef1bc3ed692e5441ab6f87c',
                required: true
            },
            locationName: {
                type: 'string',
                example: 'Subsidary',
                required: true
            },
            postcode: {
                type: 'string',
                example: '380015',
                required: true
            },
            country: {
                type: 'string',
                example: 'India',
                required: true
            },
            addressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding',
                required: true
            },
            addressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            city: {
                type: 'string',
                example: 'Ahmedabad',
                required: true
            },
            state: {
                type: 'string',
                example: 'Gujarat'
            },
            timezone: {
                type: 'string',
                example: 'Asia/Kolkata',
                required: true
            }
        }
    };

    swaggerJson.definitions.clientProfileSaveLater = {
        'type': 'object',
        'properties': {
            step: {
                type: 'number',
                example: 1
            },
            firstName: {
                type: 'string',
                example: 'Client\'s First'
            },
            lastName: {
                type: 'string',
                example: 'Client\'s Last'
            },
            countryCode: {
                type: 'string',
                example: '91'
            },
            phoneNumber: {
                type: 'string',
                example: '9925461330'
            },
            jobTitle: {
                type: 'string',
                example: 'CTO'
            },
            jobRole: {
                type: 'string',
                example: 'hiring-manager'
            },
            timeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            addressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding'
            },
            addressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            city: {
                type: 'string',
                example: 'Ahmedabad'
            },
            country: {
                type: 'string',
                example: 'India'
            },
            companyName: {
                type: 'string',
                example: 'Soft Silicon'
            },
            companyregisteredNumber: {
                type: 'string',
                example: 'ABC'
            },
            companyPincode: {
                type: 'string',
                example: '380015'
            },
            companyCity: {
                type: 'string',
                example: 'Ahmedabad'
            },
            companyCountry: {
                type: 'string',
                example: 'India'
            },
            companyAddressLineOne: {
                type: 'string',
                example: 'Some Building'
            },
            companyAddressLineTwo: {
                type: 'string',
                example: 'Some Stree'
            },
            website: {
                type: 'string',
                example: 'http://www.codemonk.ai'
            },
            vatNumber: {
                type: 'string',
                example: 'ABC'
            },
            authorityFirstName: {
                type: 'string',
                example: 'Authority\'sFirst'
            },
            authorityLastName: {
                type: 'string',
                example: 'authority\'s Last'
            },
            authorityEmail: {
                type: 'string',
                example: 'authrity@example.com'
            },
            authorityCountryCode: {
                type: 'string',
                example: '91'
            },
            authorityPhoneNumber: {
                type: 'string',
                example: '9925061220'
            },
            authorityJobTitle: {
                type: 'string',
                example: 'CEO'
            },
            authorityPostcode: {
                type: 'string',
                example: '380015'
            },
            authorityTimeZone: {
                type: 'string',
                example: 'Asia/Kolkata'
            },
            authorityAddressLineOne: {
                type: 'string',
                example: 'Some House, Some Buildding'
            },
            authorityAddressLineTwo: {
                type: 'string',
                example: 'Some Road, Somewhere'
            },
            authorityCity: {
                type: 'string',
                example: 'Ahmedabad'
            },
            authorityCountry: {
                type: 'string',
                example: 'India'
            }
        }
    };

    swaggerJson.definitions.successClientPhone = {
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

    swaggerJson.definitions.successClientProfile = {
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

    swaggerJson.definitions.successClientProfileSaveLater = {
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

    swaggerJson.definitions.successClientAboutYou = {
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

    swaggerJson.definitions.successClientAboutCompany = {
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
