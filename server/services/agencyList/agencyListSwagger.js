const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/agency/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Agency'
            ],
            parameters: [{
                in: 'query',
                name: 'q',
                description: 'Filter agency first name, last name and email'
            },
            {
                in: 'query',
                name: 'status',
                description: `Filter radio option for agency status
                // -1 = All, 0 = Unregistered, 1 = Active or 2 = Suspended`
            },
            {
                in: 'query',
                name: 'limit',
                description: 'limit for result set'
            },
            {
                in: 'query',
                name: 'page',
                description: 'page of result set'
            }],
            description: 'agency list',
            summary: 'agency list',
            responses: {
                200: {
                    description: 'Agency list',
                    schema: {
                        $ref: '#/definitions/agencyListSuccess'
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

    swaggerJson.definitions.agencyListSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    'docs': [
                        {
                            '_id': '5f475a54e21d7adea6a0370c',
                            'email': 'agencystart@mailinator.com',
                            'agencyUserId': '5f4754eb3fc8842306a8220d',
                            'name': 'Agency Name',
                            'agencyName': 'My Agency Name',
                            'status': 'Active'
                        },
                        {
                            '_id': '5fbe4bf18fb6cc421b4181ea',
                            'email': 'agencyonboard@mailinator.com',
                            'agencyUserId': '5fbe4bd4a5331b612f29c1ca',
                            'name': 'Agency Onboard',
                            'agencyName': 'Onboard agencyu',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f8ebfaab46e477dfda2148c',
                            'email': 'engagebaytalent@mailinator.com',
                            'agencyUserId': '5f8ebf41534bf757c60f8f1a',
                            'name': 'EFNAME ELANAME',
                            'agencyName': 'New ENB',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f7de1c220d78c3b5938845e',
                            'email': 'agencyprofile@mailinator.com',
                            'agencyUserId': '5f7de1b1e6eb7427fe0cac0d',
                            'name': 'Hariharan Ranganathan',
                            'agencyName': 'Ganit Business Solution Private Limited',
                            'status': 'Unregistered'
                        },
                        {
                            '_id': '5fc5078808a777c47a110f0d',
                            'email': 'agencyaddtalentissue@mailinaitor.com',
                            'agencyUserId': '5fc507522139e413d32a5788',
                            'name': 'Hitesh Parikh',
                            'agencyName': 'My Com ABC',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f7c5679ede0ad3102e0f808',
                            'email': 'agencylocal@mailinator.com',
                            'agencyUserId': '5f7c56647886f668f435696f',
                            'name': 'New Name Last Name',
                            'agencyName': 'my Agency new',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f4e0e2ecf759d928bda1fdc',
                            'email': 'agencyuser@yopmail.com',
                            'agencyUserId': '5f4e0dcbae932622307694d1',
                            'name': 'Test Name First Name',
                            'agencyName': 'My Agency',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f533531f5c646a54562a5e8',
                            'email': 'localagency@mailinator.com',
                            'agencyUserId': '5f5335172317791e189ac32d',
                            'name': 'test test',
                            'agencyName': 'My COM',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f573627792159b0f0ab519b',
                            'email': 'newagencywithacl@mailinator.com',
                            'agencyUserId': '5f57361834ed4c3769525b33',
                            'name': 'test test',
                            'agencyName': 'My Com',
                            'status': 'Active'
                        },
                        {
                            '_id': '5f5b990fad849dbfbf43aae9',
                            'email': 'agencyfinal@mailinator.com',
                            'agencyUserId': '5f5b98f71e038f0c7ce16918',
                            'name': 'test test',
                            'agencyName': 'My Com',
                            'status': 'Active'
                        }
                    ],
                    totalDocs: 13,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
