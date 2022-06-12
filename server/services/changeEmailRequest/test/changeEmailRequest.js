module.exports = {
    email: [{
        it: 'As a user I should validate if email is not passed',
        options: {},
        status: 0
    },
    {
        it: 'As a user I should validate if email is passed incorrectly',
        options: {
            email: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if email must not be existing',
        options: {
            email: 'clientonboard@mailinator.com'
        },
        status: 0
    }]
};
