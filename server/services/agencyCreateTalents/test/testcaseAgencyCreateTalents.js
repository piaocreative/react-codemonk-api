module.exports = {
    talents: [{
        it: 'As a user I should validate talent array without first name',
        options: {
            lastName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent array without last name',
        options: {
            firstName: 'Test~'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent array without email',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent array without currency',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            email: 'talent1@mailinator.com'
        },
        status: 0
    },
    {
        it: 'As a user I should validate talent array without rate per hour',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            email: 'talent1@mailinator.com',
            currency: 'USD'
        },
        status: 0
    }, {
        it: 'As a user I should validate already existed talent must not be added',
        options: {
            firstName: 'Talent One',
            lastName: 'Talent Last One',
            email: 'talent@mailinator.com',
            currency: 'USD',
            rate: 40
        },
        status: 0
    }]
};
