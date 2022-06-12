module.exports = {
    signinAccount: [
        {
            it: 'As a user I should validate if email is not pass',
            options: {
                'email': '',
                'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if password is not pass',
            options: {
                'email': 'john1@mailinator.com',
                'password': ''
            },
            status: 0
        },
        {
            it: 'As a user, I should check invalid password',
            options: {
                'email': 'admin@mailinator.com',
                'password': 'Reset1@123'
            },
            status: 0
        }
    ]
};
