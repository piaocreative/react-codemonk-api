module.exports = {
    billing: [{
        it: 'As a user, I should able to edit invalid billing',
        options: {
            billingType: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid billing',
        options: {
            billingType: 'SomeType'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only billingType',
        options: {
            billingType: 'company'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only billingType ,companyName',
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode,companyCity`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode,companyCity,companyCountry`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India'
        },
        status: 0
    }]
};
