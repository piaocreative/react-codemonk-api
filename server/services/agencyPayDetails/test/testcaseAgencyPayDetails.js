module.exports = {
    payDetails: [{
        it: 'As a user I should validate empty object',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank name is empty',
        options: {
            bankName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank name is less than minimum',
        options: {
            bankName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank name is greater than maximum',
        options: {
            bankName: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank account number is empty',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank account number is less than minimum',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank account number is greater than maximum',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: '12345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank ifsc/bic number is empty',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: 'ABC12345',
            bankCode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank ifsc/bic number is less than minimum',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: 'ABC12345',
            bankCode: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency bank ifsc/bic number is greater than maximum',
        options: {
            bankName: 'Kotak Bank',
            bankAccountNumber: 'ABC12345',
            bankCode: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    }]
};
