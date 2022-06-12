const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/education-details'] = {
        'put': {
            'security': [{
                'bearerAuth': []
            }],
            'tags': [
                'Talent'
            ],
            'description': 'Update education  details',
            'summary': 'Update education  details',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': `education Type as "bank" or "paypal"/billingType
                     as "freelancer" or "company" `,
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/educationDetails'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Update pay details',
                    'schema': {
                        '$ref': '#/definitions/successeducationDetails'
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

    swaggerJson.definitions.educationDetails = {
        type: 'object',
        properties: {
            educationDetails: {
                type: 'array',
                example: [{
                    degreeLevel: 'Master’s or Higher',
                    degreeTitle: 'Master in Computer Application',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                },
                {
                    degreeLevel: 'Bachelor’s',
                    degreeTitle: 'Bachelor in Computer Science',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                }]
            },
            certificateDetails: {
                type: 'array',
                example: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon',
                    certificateId: 'ABC123'
                },
                {
                    name: 'MongoDB Certified DB Developer',
                    dateObtained: '30/12/2019',
                    issuedBy: 'Mongo Universiry',
                    certificateId: 'MONGO123'
                }]
            }
        }
    };

    swaggerJson.definitions.successeducationDetails = {
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
