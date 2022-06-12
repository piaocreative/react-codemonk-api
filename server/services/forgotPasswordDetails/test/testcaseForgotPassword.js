module.exports = {
    forgotPassword: [
        {
            it: 'As a user, I should validate should not be blank',
            options: {

            },
            status: 0
        },
        {
            it: 'As a user, I should validate email',
            options: {
                email: 'john1'
            },
            status: 1
        }
    ],
    verifyToken: [
        {
            it: 'As a user, I should validate should not be blank',
            options: {
            },
            status: 0
        }
    ],
    resetPassword: [
        {
            it: 'As a user, I should validate not be blank',
            options: {

            },
            status: 0
        },
        {
            it: 'As a user, I should validate only password entered',
            options: {
                'password': 'Reset@123'
            },
            status: 0
        },
        {
            it: 'As a user, I should validate only token entered',
            options: {
                'token': 'Reset@123'
            },
            status: 0
        }
    ]
};
