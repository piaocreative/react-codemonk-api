module.exports = {
    editTalent: [{
        it: 'As a user I should validate talent must have first name',
        options: {
            lastName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent must have last name',
        options: {
            firstName: 'Test~'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent must have currency',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent must have daily rate',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            currency: 'USD'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent must have id that needs to be updated',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            currency: 'USD',
            rate: 400
        },
        status: 0
    }]
};
