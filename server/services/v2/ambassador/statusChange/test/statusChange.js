module.exports = {
    changeStatus: [{
        it: 'As a admin, I should validate ambassador status change must have ambassador id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate ambassador status change ambassador id must not be blank',
        options: {
            ambassadorId: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate ambassador status change with status must not be as blank',
        options: {
            ambassadorId: '621e21ccecb647c370940ab1',
            status: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate ambassador status change with status must be valid',
        options: {
            ambassadorId: '621e21ccecb647c370940ab1',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate ambassador status change status must be minimum value',
        options: {
            ambassadorId: '621e21ccecb647c370940ab1',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate ambassador status change status must be maximum character',
        options: {
            ambassadorId: '621e21ccecb647c370940ab1',
            status: 3
        },
        status: 0
    }]
};
