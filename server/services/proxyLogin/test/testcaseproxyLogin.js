module.exports = {
    signinAccount: [
        {
            it: 'As a user I should validate if user id is not pass',
            options: {
                'userId': ''
            },
            status: 0
        },
        {
            it: 'As a user, I should check invalid user id',
            options: {
                'userId': 'admin@mailinator.com',
                'password': 'Reset1@123'
            },
            status: 0
        }
    ]
};
