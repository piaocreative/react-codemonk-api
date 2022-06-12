module.exports = {
    add: [{
        it: 'As a talent, I should not able to add timesheet if timesheet week didn\'t has 7 days',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet if project is not valid',
        body: {
            'projectId': '5f631e56d37cbb4801f00000',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet date start is not valid',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet date start is not valid',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': 'abcd',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet if value of week is not valid',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 20,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet if i\'m not assigned in Project',
        body: {
            'projectId': '5f2abf4364712b10ad0e8e3c',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet with approved status',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'dateStart': '01/08/2021',
            status: 1,
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 8,
                    'minutes':0
                }
            ]
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I able to add timesheet',
        body: {
            'projectId': '5f631e56d37cbb4801f0fa45',
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 8,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to add timesheet 2',
        body: {
            projectId: '5f631e56d37cbb4801f0fa45',
            dateStart: '15/08/2021',
            status: 3,
            week: [
                {
                    'date': '15/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '16/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '17/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '18/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '19/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '20/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '21/08/2021',
                    'hours': 8,
                    'minutes':0
                }
            ]
        },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I should not able to add timesheet again',
        body: {
            projectId: '5f631e56d37cbb4801f0fa45',
            dateStart: '07/12/2020',
            status: 3,
            week: [
                {
                    'date': '08/12/2020',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '09/01/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '10/01/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '11/01/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '12/01/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '13/01/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '14/01/2021',
                    'hours': 8,
                    'minutes':0
                }
            ]
        },
        status: 0,
        statusCode: 400
    }],
    list: [{
        it: 'As a talent, I able to get list of timesheet with status filter',
        query: {
            status: 1
        },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to get list of timesheet with search',
        query: { q: 'a' },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to get list of timesheet which sorted by weekStart date',
        query: {
            sort: JSON.stringify({ dateStart: -1 })
        },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to get list of timesheet sorted by latest added when I pass wrong sort parameters',
        query: {
            sort: 'abcd'
        },
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to get list of timesheet without any parameters',
        query: {},
        status: 1,
        statusCode: 200
    }, {
        it: 'As a talent, I able to get list of timesheet with projectid filter',
        query: {
            projectId: '5f2abf4364712b10ad0e8e3c'
        },
        status: 1,
        statusCode: 200
    } ],
    edit: [{
        it: 'As a talent, I should not able to add timesheet if timesheet week didn\'t has 7 days',
        body: {
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet date start is not valid',
        body: {
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet week day is not valid',
        body: {
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': 'abcd',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet if value of week is not valid',
        body: {
            'dateStart': '01/08/2021',
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 19,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 4,
                    'minutes':0
                }
            ],
            status: 3
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I should not able to add timesheet with approved status',
        body: {
            dateStart: '01/08/2021',
            status: 1,
            week: [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 8,
                    'minutes':0
                }
            ]
        },
        status: 0,
        statusCode: 400
    }, {
        it: 'As a talent, I able to add timesheet',
        body: {
            'dateStart': '01/08/2021',
            status: 0,
            'week': [
                {
                    'date': '01/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '02/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '03/08/2021',
                    'hours': 8,
                    'minutes':0
                },
                {
                    'date': '04/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '05/08/2021',
                    'hours': 0,
                    'minutes':0
                },
                {
                    'date': '06/08/2021',
                    'hours': 4,
                    'minutes':0
                },
                {
                    'date': '07/08/2021',
                    'hours': 8,
                    'minutes':0
                }
            ]
        },
        status: 1,
        statusCode: 200
    }]
};
