const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/config/company/by-name'] = {
        get: {
            security:[{
                bearerAuth: []
            }],
            tags: ['Configuration'],
            parameters: [{
                in: 'query',
                name:'q',
                description:'Search company by name',
                required: true
            }],
            description:'Search company by name',
            summary: 'Search company by name',
            responses: {
                200 :{
                    description: 'List of the company which are matched',
                    schema: {
                        $ref: '#/definitions/companySearchNameSuccess'
                    }
                }
            }
        }
    }

    swaggerJson.definitions.companySearchNameSuccess = {
        properties: {
            status: {
                type: 'number',
                example :1
            },
            data: {
                type:'array',
                example:[{
                    _id: '5f05e1ceec335829f4dea020',
                    name: 'Codemonk'
                }]
            },
            message: {
                example: message.SUCCESS
            }
        }
    }

    return swaggerJson;
};