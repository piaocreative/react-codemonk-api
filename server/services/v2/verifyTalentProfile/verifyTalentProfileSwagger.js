const message = require('../../../locales/en');



const responses = {
    200: {
        description: 'Update client user billing details',
        schema: {
            $ref: '#/definitions/successAddTimeSheet'
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


    swaggerJson.paths['/v2/talent/{id}/verified-profile'] = {
        patch: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent(v2)'
            ],
            description: 'verify talent profile by admin/client',
            summary: 'verify talent profile by admin/client',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Talent id',
                    required: true,
                    example: '5f631e56d37cbb4801f0fa45'
                },
                {
                    in: 'formData',
                    name: 'verifiedProfile',
                    required: true,
                    type: 'boolean',
                    enum: [true, false],
                    description: 'True - Verified, False - Not Verified'
                }
            ],
            responses
        }
    };



    swaggerJson.definitions.successAddTimeSheet = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.ADD_TIMESHEET_SUCCESS
            }
        }
    };

    return swaggerJson;
};
