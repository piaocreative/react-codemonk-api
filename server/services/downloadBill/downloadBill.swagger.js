
const responses = {
    200: {
        description: 'Update client user billing details',
        schema: {
            $ref: '#/definitions/success'
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
};

module.exports = swaggerJson => {

    swaggerJson.paths['/v2/timesheet/{id}/download/bill'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet(v2)'
            ],
            description: 'edit timesheet by user',
            summary: 'edit timesheet by user',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Timesheet id',
                    required: true,
                    example: '5f631e56d37cbb4801f0fa45'
                }
            ],
            responses
        }
    };




    return swaggerJson;
};
