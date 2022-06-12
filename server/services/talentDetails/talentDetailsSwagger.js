const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/details/{id}'] = {
        'get': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            parameters: [{
                'in': 'path',
                'name': 'id',
                'description': 'id of talent'
            }],
            'description': 'search talent',
            'summary': 'search talent',
            'responses': {
                '200': {
                    'description': 'Update project details',
                    'schema': {
                        '$ref': '#/definitions/success'
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
    swaggerJson.paths['/talent/download/{id}'] = {
        'get': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Client'
            ],
            parameters: [{
                'in': 'path',
                'name': 'id',
                'description': 'id of talent'
            }],
            'description': 'search talent',
            'summary': 'search talent',
            'responses': {
                '200': {
                    'description': 'download talent details',
                    'schema': {
                        '$ref': '#/definitions/downloadSuccess'
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

    swaggerJson.definitions.success = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                '_id': '5f2d3e4eba0dae43224ae38e',
                'profilePicture': 'Profile_PIC_URL',
                'teamPreference': [
                    'individuals'
                ],
                'assignments': [
                    'remote-only'
                ],
                'skills': [
                    {
                        '_id': '5f2d3eabba0dae43224ae390',
                        'name': 'Android',
                        'rate': 9
                    }
                ],
                'projectDetails': [
                    {
                        '_id': '5f2d3ec2ba0dae43224ae391',
                        'name': 'Codemonk',
                        'url': '',
                        'description': '<p>&nbsp;dsfdsf ds fdsfds fds fds fdsf s fds fds fds fds fds fds fds fds fdsfdsfds fds fds</p>\n',
                        'role': 'Product (UI) designer',
                        'keyAchievements': '<p>&nbsp;dsfds fds fdsfds  dsfds fdsfds f dsf sd ds fds fds fds fdsfdsfds fdsfds fds f</p>\n'
                    }
                ],
                'educationDetails': [
                    {
                        '_id': '5f2d3ee7ba0dae43224ae393',
                        'degreeLevel': 'Master’s or Higher',
                        'degreeTitle': 'Computer Science',
                        'collegeName': 'IETE',
                        'country': 'Armenia',
                        'startDate': '2020-07-27T00:00:00.000Z',
                        'endDate': '2020-07-27T00:00:00.000Z',
                        'startYear': 2020
                    }
                ],
                'certificateDetails': [],
                'workExperience': [
                    {
                        '_id': '5f3636c38e8a871d324cf6a8',
                        'jobTitle': 'New Test for Is present',
                        'employmentType': 'Fulltime',
                        'employer': 'Test is pressent',
                        'country': 'India',
                        'startDate': '2020-07-30T00:00:00.000Z',
                        'endDate': '2024-08-14T00:00:00.000Z',
                        'shortDescription': '<p>sdsadsadsadasd</p>\n',
                        'isPresent': false
                    },
                    {
                        '_id': '5f2d3ed8ba0dae43224ae392',
                        'jobTitle': 'Sr. Software Engineer',
                        'employmentType': 'Parttime',
                        'employer': 'Innovify Business intelligence',
                        'country': 'Algeria',
                        'startDate': '2020-07-28T00:00:00.000Z',
                        'endDate': '2020-08-28T00:00:00.000Z',
                        'shortDescription': '<p>dsfds fdsfsdfdsfds fds fdsfdsfsd fdsf ds fdsfds fdsfds fds fdsfds fdsfdsfds fds fds</p>\n',
                        'isPresent': false
                    }
                ],
                'city': 'London',
                'country': 'Algeria',
                'timeZone': 'Etc/GMT-12',
                'gitHubUrl': '',
                'linkedInUrl': '',
                'primaryRole': 'Data Scientist',
                'professionalSummary': '<p>cdsfdsfdsfdsfdsfd fds dsfsd fds fds fsd fds fds fds fds fdsf</p>\n',
                'stackOverFlowUrl': '',
                'yearsOfExperience': 'Intermediate - 5 - 8 yrs',
                'workPreference': ['fulltime'],
                'ratePerHour': 100,
                'firstName': 'T',
                'lastName': 'D',
                'status': 'Unregistered'
            },
            message: {
                example: message.SUCCESS
            }
        }
    };
    swaggerJson.definitions.downloadSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                'pdfPath': '5f2d3e4eba0dae43224ae38e'
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
