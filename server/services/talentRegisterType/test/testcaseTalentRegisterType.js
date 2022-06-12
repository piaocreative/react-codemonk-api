module.exports = {
    registerType: [{
        it: 'As a user I should validate if register type is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if register type is passed in correct',
        options: {
            registerType: 'Invalid'
        },
        status: 0
    }]
};
