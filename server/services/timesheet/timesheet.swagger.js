const message = require('../../locales/en');
const moment = require('moment');
const {
    TIMESHEET: {
        STATUS_LIST, ADMIN_STATUS, CLIENT_STATUS, TALENT_STATUS, AGENT_STATUS, STATUS
    }
} = require('../../util/constants');

const STATUS_VALUES = Object.keys(STATUS).map((d)=>{
    return ` ${d} - ${STATUS[d]}` ;
});

const addEditStatus = {
    type: 'number',
    enum: [0, 3],
    required: true,
    description: '0 - SUBMITTED, 3 - DRAFT'
};

const week = {
    type: 'array',
    example: [{
        date: moment().format('DD/MM/YYYY'),
        value: 1
    },
    {
        date: moment().add(1, 'days').format('DD/MM/YYYY'),
        value: 0.5
    }, {
        date: moment().add(2, 'days').format('DD/MM/YYYY'),
        value: 1
    }, {
        date: moment().add(3, 'days').format('DD/MM/YYYY'),
        value: 0
    }, {
        date: moment().add(4, 'days').format('DD/MM/YYYY'),
        value: 0
    }, {
        date: moment().add(5, 'days').format('DD/MM/YYYY'),
        value: 0.5
    }, {
        date: moment().add(6, 'days').format('DD/MM/YYYY'),
        value: 1
    }],
    items: {
        type: 'object',
        required: [
            'date',
            'value'
        ],
        properties: {
            date: {
                type: 'string'
            },
            value: {
                type: 'integer'
            }
        }
    }
};

const dateStart = {
    type: 'string',
    format: 'date',
    example: moment().format('DD/MM/YYYY')
};

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

const editTimeSheetProps = {
    dateStart,
    week,
    status: addEditStatus
};

module.exports = swaggerJson => {
    swaggerJson.paths['/timesheet'] = {
        post: {
            deprecated: true,
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet'
            ],
            description: 'Add timesheet by user (Override by /v2/timesheet)',
            summary: 'Add timesheet by user (Override by /v2/timesheet)',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/addTimeSheet'
                    }
                }
            ],
            responses
        },
        get: {
            deprecated: true,
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet'
            ],
            description: 'Timesheet list (Override by /v2/timesheet)',
            summary: 'Timesheet list (Override by /v2/timesheet)',
            parameters: [
                {
                    in: 'query',
                    name: 'status',
                    enum: STATUS_LIST,
                    type: 'integer',
                    description: `Status filter : ${STATUS_VALUES} \
                    \n Admin: ${ADMIN_STATUS} \n Client: ${CLIENT_STATUS} \
                    \n Talent: ${TALENT_STATUS} \n Agency: ${AGENT_STATUS} \
                    `
                },
                {
                    in: 'query',
                    name: 'projectId',
                    type: 'string',
                    description: 'Get parentId filter'
                },
                {
                    in: 'query',
                    name: 'search',
                    type: 'string',
                    description: `Search in timesheet \n Talent: Seach using project name
                    `
                },
                {
                    in: 'query',
                    name: 'sort',
                    type: 'string',
                    enum: [
                        '{ "dateStart": 1 }',
                        '{ "dateStart": -1 }',
                        '{ "projectName": 1 }',
                        '{ "projectName": -1 }',
                        '{ "_id":  1 }',
                        '{ "_id": -1 }',
                        '{ "talentShortName": 1 }',
                        '{ "talentShortName": -1 }'],
                    description: 'Sort in timesheet'
                },
                {
                    in: 'query',
                    name: 'limit',
                    type: 'integer',
                    description: 'limit for result set'
                },
                {
                    in: 'query',
                    name: 'page',
                    type: 'integer',
                    description: 'page of result set'
                }
            ],
            responses
        }
    };

    swaggerJson.paths['/timesheet/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet'
            ],
            description: 'get timesheet by user',
            summary: 'get timesheet by user',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    description: 'Timesheet Id'
                }
            ],
            responses
        },
        put: {
            deprecated: true,
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet'
            ],
            description: 'edit timesheet by user (Override by /v2/timesheet/:id',
            summary: 'edit timesheet by user (Override by /v2/timesheet/:id',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Timesheet id',
                    required: true,
                    example: '5f631e56d37cbb4801f0fa45'
                },
                {
                    in: 'body',
                    name: 'body',
                    description: 'Body parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/editTimeSheet'
                    }
                }
            ],
            responses
        },
        patch: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Timesheet'
            ],
            description: 'Update timesheet status by admin/client',
            summary: 'Update timesheet status by admin/client',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Timesheet id',
                    required: true,
                    example: '5f631e56d37cbb4801f0fa45'
                },
                {
                    in: 'formData',
                    name: 'status',
                    required: true,
                    type: 'integer',
                    enum: [1, 2],
                    description: '1 - Accept, 2 - In review'
                }
            ],
            responses
        }
    };

    swaggerJson.definitions.addTimeSheet = {
        type: 'object',
        properties: {
            ...editTimeSheetProps,
            projectId: {
                type: 'string',
                example: '5f631e56d37cbb4801f0fa45'
            }
        }
    };

    swaggerJson.definitions.editTimeSheet = {
        type: 'object',
        properties: editTimeSheetProps
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
