module.exports = {
    email: [{
        it: 'As a user I should validate if email change otp is not passed',
        options: {},
        status: 0
    },
    {
        it: 'As a user I should validate if email change otp is passed incorrectly',
        options: {
            otp: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if email change otp is passed partial',
        options: {
            otp: 12345
        },
        status: 0
    }]
};
