module.exports = {
    changeStatus: [{
        it: 'As a admin, I should validate client status change must have client id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate client status change client id must not be blank',
        options: {
            clientId: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate client status change with name must not be as blank',
        options: {
            clientId: '5f30f3920997b6547a590f94',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate client status change with status must be valid',
        options: {
            clientId: '5f30f3920997b6547a590f94',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate client status change status must be minimum value',
        options: {
            clientId: '5f30f3920997b6547a590f94',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate client status change status must be maximum character',
        options: {
            clientId: '5f30f3920997b6547a590f94',
            status: 3
        },
        status: 0
    }]
};
