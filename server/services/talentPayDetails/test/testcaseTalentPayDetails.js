module.exports = {
    payDetails: [{
        it: 'As a user I should validate if currency is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if currency is as empty',
        options: {
            currency: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if currency is not from the allowed list',
        options: {
            currency: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is not passed',
        options: {
            currency: 'GBP'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is as empty',
        options: {
            currency: 'GBP',
            ratePerHour: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is 0',
        options: {
            currency: 'GBP',
            ratePerHour: 0
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is not passed',
        options: {
            currency: 'GBP',
            ratePerHour: 25
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is as empty',
        options: {
            currency: 'GBP',
            ratePerHour: 25,
            billingType: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is not from allowed list',
        options: {
            currency: 'GBP',
            ratePerHour: 25,
            billingYype: 'SomeType'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if payout type is not passed',
        options: {
            currency: 'GBP',
            ratePerHour: 25,
            billingType: 'freelancer'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if payout type is as empty',
        options: {
            currency: 'GBP',
            ratePerHour: 25,
            billingType: 'freelancer'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if payout type is not from allowed list',
        options: {
            currency: 'GBP',
            ratePerHour: 25,
            billingType: 'freelancer'
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type paypal with invalid email',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'paypal',
            paypalEmail: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with invalid bank name',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank'
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with bank name as blank',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank',
            bankName: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with invalid bank account number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank',
            bankName: 'Kotak'
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with bank account number empty',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with invalid bank code',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user, I should check pay type bank with bank code as empty',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'freelancer',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company without company name',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company without registered number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company registered number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company Pincode',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company Pincode',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company city',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company city',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company address line one',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company address line one',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'

        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company insurance value',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company insurance value',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company insurance value as non number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 'some value',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without public insurance value',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid public insurance value',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company insurance value as non number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 'some value',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without employer insurance value',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid employer insurance',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            companyEmployerInsuranceValue: '',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as employer insurance value as non number',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            companyEmployerInsuranceValue: 'some values',
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type without company address country',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            companyEmployerInsuranceValue: 10000000,
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type company address country as empty',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: '',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            companyEmployerInsuranceValue: 10000000,
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type company address country invalid option',
        options: {
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'Country',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: 1000000,
            companyPublicInsurancesValue: 5000000,
            companyEmployerInsuranceValue: 10000000,
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT11234'
        },
        status: 0
    }]
};
