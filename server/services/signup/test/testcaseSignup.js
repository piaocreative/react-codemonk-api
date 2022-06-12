module.exports = {
    registerAccount: [
        {
            it: 'As a user I should validate if email is not pass',
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
            it: 'As a user I should validate if password is not pass',
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
    ],
    verifyAccount: [
        {
            it: 'As a user, I should check blank email.',
            options: {
                email: '',
                otp: 123456
            },
            status: 0
        },
        {
            it: 'As a user, I should check email in request.',
            options: {
                otp: 0
            },
            status: 0
        },
        {
            it: 'As a user, I should check blank otp in request.',
            options: {
                email: 'abc@gmai.com',
                otp: 0
            },
            status: 0
        },
        {
            it: 'As a user, I should check blank otp in request as string.',
            options: {
                email: 'abc@gmai.com',
                otp: ''
            },
            status: 0
        },
        {
            it: 'As a user, I should check otp lenght.',
            options: {
                email: 'abc@gmai.com',
                otp: 12345
            },
            status: 0
        },
        {
            it: 'As a user, I should check invalid otp entered.',
            options: {
                email: 'john@mailinator.com',
                otp: 123457
            },
            status: 0
        }
    ],
    resendOTP: [
        {
            it: 'As a user, I should check blank email.',
            options: {
                email: ''
            },
            status: 0
        },
        {
            it: 'As a user, I should check email in request.',
            options: {

            },
            status: 0
        },
        {
            it: 'As a user, I should check not email available.',
            options: {
                email: 'abc@gmai.com',
                otp: 0
            },
            status: 0
        }
    ],
    agencyTalentGetEmail: [{
        it: 'As a agency talent I should validate if token is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if token is incorrect',
        options: {
            token: 'not uuid'
        },
        status: 0
    }],
    agencyTalentAccount: [{
        it: 'As a agency talent I should validate if email is not pass',
        options: {
            token: '5f523e4a7e416a76f64ea920',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if email key existing',
        options: {
            email: '',
            token: '5f523e4a7e416a76f64ea920',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should check valid email',
        options: {
            email: 'john1',
            token: '5f523e4a7e416a76f64ea920',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if password is not pass',
        options: {
            email: 'talent1@mailinator.com'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate password is not empty',
        options: {
            email: 'talent1@mailinator.com',
            password: ''
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if password is sha256 string with 64 characters',
        options: {
            email: 'talent1@mailinator.com',
            password: '12345678910123456789101'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if token is not password',
        options: {
            email: 'talent1@mailinator.com',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if token is incorrect',
        options: {
            email: 'talent1@mailinator.com',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7',
            token: 'not uuid'
        },
        status: 0
    },
    {
        it: 'As a agency talent I should validate if token is incorrect',
        options: {
            email: 'talent2@mailinator.com',
            token: '5f523e4a7e416a76f64ea920',
            password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
        },
        status: 0
    }]
};
