module.exports = {
    changeStatus: [{
        it: 'As a admin, I should validate agency status change must have agency id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate agency status change agency id must not be blank',
        options: {
            agencyId: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate agency status change with name must not be as blank',
        options: {
            agencyId: '5f30f3920997b6547a590f94',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate agency status change with status must be valid',
        options: {
            agencyId: '5f30f3920997b6547a590f94',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate agency status change status must be minimum value',
        options: {
            agencyId: '5f30f3920997b6547a590f94',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate agency status change status must be maximum character',
        options: {
            agencyId: '5f30f3920997b6547a590f94',
            status: 3
        },
        status: 0
    }]
};
