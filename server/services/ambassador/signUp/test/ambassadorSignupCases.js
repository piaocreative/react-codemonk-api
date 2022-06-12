module.exports = {
    registerAccount: [
        {
            it: 'As a user I should validate if email is not passed or is empty',
            options: {
                email: '',
                password: 'Reset@123'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if email key existing',
            options: {
                password: 'Test@12'
            },
            status: 0
        },
        {
            it: 'As a user I should check valid email',
            options: {
                email: 'john1',
                password: ''
            },
            status: 0
        },
        {
            it: 'As a user I should validate if password key existing',
            options: {
                email: 'john1@mailinator.com',
                password: ''
            },
            status: 0
        },
        {
            it: 'As a user I should validate if password is not passed or is empty',
            options: {
                email: 'john1@mailinator.com',
                password: ''
            },
            status: 0
        },
        {
            it: 'As a user I should validate if password is sha256 string with 64 characters',
            options: {
                email: 'john1@mailinator.com',
                password: '12345678910123456789101'
            },
            status: 0
        },
        {
            it: 'As a user I should check non-disposable email',
            options: {
                email: 'disposabletalent@yopmail.com',
                password: 'Test@123'
            },
            status: 0
        }
    ]
};
