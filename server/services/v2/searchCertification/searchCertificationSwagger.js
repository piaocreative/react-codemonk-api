const message = require('../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/config/certification/by-name'] = {
        get: {
            security:[{
                bearerAuth: []
            }],
            tags: ['Configuration'],
            parameters: [{
                in: 'query',
                name:'q',
                description:'Search certification by name',
                required: true
            }],
            description:'Search certification by name',
            summary: 'Search certification by name',
            responses: {
                200 :{
                    description: 'List of the certification which are matched',
                    schema: {
                        $ref: '#/definitions/certificationSearchNameSuccess'
                    }
                }
            }
        }
    }

    swaggerJson.definitions.certificationSearchNameSuccess = {
        properties: {
            status: {
                type: 'number',
                example :1
            },
            data: {
                type:'array',
                example:[{
                    _id: '5f05e1ceec335829f4dea020',
                    name: 'CCNA'
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    }

    return swaggerJson;
};