module.exports = {
    changeStatus: [{
        it: 'As a admin I should validate project talent status change must have project id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change project id must not be blank',
        options: {
            projectId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change must have talent id',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change project talent id must not be blank',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change with status must be valid',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: '5f523e4a7e416a76f64ea920',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must be minimum value',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: '5f523e4a7e416a76f64ea920',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must be maximum character',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: '5f523e4a7e416a76f64ea920',
            status: 2
        },
        status: 0
    }]
};
