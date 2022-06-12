module.exports = (swaggerJson) => {

    swaggerJson.paths['/talent/companycultures'] = {
        'get': {
            'tags': [
                'Talent'
            ],
            'description': 'Talent company cultures',
            'summary': 'Talent company cultures',
            'parameters': [
                {
                    'in': 'query',
                    'name': 'q',
                    'description': 'search'
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/companycultures'
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

    swaggerJson.definitions.companycultures = {
        'type': 'object',
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                'type': 'array',
                'example': [
                    "Accountability",
                    "Commitment to Customers",
                    "Constant Improvement",
                    "Continuous Learning",
                    "Diversity",
                    "Fun",
                    "Honesty",
                    "Humility",
                    "Innovation",
                    "Integrity",
                    "Leadership",
                    "Ownership",
                    "Passion",
                    "Quality",
                    "Teamwork",
                    "Trust"
                  ]
            },
            'message': {
                'type': 'string',
                'example': 'success'
            }
        }
    };


    return swaggerJson;
};
