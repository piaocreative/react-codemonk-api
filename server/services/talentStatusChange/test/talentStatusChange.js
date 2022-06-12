module.exports = {
    changeStatus: [{
        it: 'As a admin, I should validate talent status change must have talent id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate talent status change talent id must not be blank',
        options: {
            talentId: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate talent status change with name must not be as blank',
        options: {
            talentId: '5f30f3920997b6547a590f94',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate talent status change with status must be valid',
        options: {
            talentId: '5f30f3920997b6547a590f94',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate talent status change status must be minimum value',
        options: {
            talentId: '5f30f3920997b6547a590f94',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate talent status change status must be maximum character',
        options: {
            talentId: '5f30f3920997b6547a590f94',
            status: 3
        },
        status: 0
    }]
};
