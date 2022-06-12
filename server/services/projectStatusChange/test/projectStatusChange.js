module.exports = {
    changeStatus: [{
        it: 'As a user I should validate project status change must have project id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate project status change project id must not be blank',
        options: {
            projectId: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate project status change with name must not be as blank',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate project status change with status must be valid',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate project status change status must be minimum value',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a user I should validate project status change status must be maximum character',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            status: 8
        },
        status: 0
    }]
};
