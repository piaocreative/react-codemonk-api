module.exports = {
    inviteEmail: [{
        it: 'As a user I should validate emails must be passed',
        options: {
        },
        status: 0
    }, {
        it: 'As a user I should validate emails must not be string',
        options: {
            emails: 'test@yopmail.com'
        },
        status: 0
    },
    {
        it: 'As a user I should validate emails must not be integer',
        options: {
            emails: 1000
        },
        status: 0
    },
    {
        it: 'As a user I should validate emails must not be object',
        options: {
            emails: {
                email: 'test@yopmail.com'
            }
        },
        status: 0
    },
    {
        it: 'As a user I should validate emails must not be empty array',
        options: {
            emails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate emails should be valid one',
        options: {
            emails: [{
                email: 'invalid Email'
            }]
        },
        status: 0
    }]
};
