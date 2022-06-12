module.exports = {
    payDetails: [{
        it: 'As a user I should validate if employmentType is not passed',
        options: {

        },
        status: 0
    }, {
        it: 'As a user I should validate if employmentType is as empty',
        options: {
            employmentType: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if currencyAnnualrate is not pass',
        options: {
            employmentType: 'permanent-employee'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if annual currency is as empty',
        options: {
            employmentType: 'permanent-employee',
            currencyAnnualRate: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if annual currency is not from the allowed list',
        options: {
            employmentType: 'permanent-employee',
            currencyAnnualRate: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if annual rate is not passed',
        options: {
            employmentType: 'permanent-employee',
            currencyAnnualRate: 'GBP'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if annual rate is as empty',
        options: {
            employmentType: 'permanent-employee',
            currencyAnnualRate: 'GBP',
            annualRate: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if annual rate is 0',
        options: {
            employmentType: 'permanent-employee',
            currencyAnnualRate: 'GBP',
            annualRate: 0
        },
        status: 0
    }, {
        it: 'As a user I should validate if currency is not passed',
        options: {
            employmentType: 'freelancer-consultant',
        },
        status: 0
    },
    {
        it: 'As a user I should validate if currency is as empty',
        options: {
            employmentType: 'freelancer-consultant',
            currency: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if currency is not from the allowed list',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is not passed',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is as empty',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP',
            ratePerHour: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if rate Per Hour is 0',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP',
            ratePerHour: 0
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is not passed',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP',
            ratePerHour: 25
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is as empty',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP',
            ratePerHour: 25,
            billingType: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if billing type is not from allowed list',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'GBP',
            ratePerHour: 25,
            billingYype: 'SomeType'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company without company name',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: ''
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
            employmentType: 'freelancer-consultant'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company registered number',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company Pincode',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company Pincode',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company city',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company city',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company address line one',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company address line one',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without company insurance value',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid company insurance value',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            companyProfessionInsuranceValue: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company insurance value as non number',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without public insurance value',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid public insurance value',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as company insurance value as non number',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as without employer insurance value',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as invalid employer insurance',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD',
            companyEmployerInsuranceValue: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type as employer insurance value as non number',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD',
            companyEmployerInsuranceValue: 'some values'
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type without company address country',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD',
            companyEmployerInsuranceValue: 10000000
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type company address country as empty',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: '',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD',
            companyEmployerInsuranceValue: 10000000
        },
        status: 0
    },
    {
        it: 'As a user, I should check billing type company address country invalid option',
        options: {
            employmentType: 'freelancer-consultant',
            currency: 'USD',
            ratePerHour: 40,
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'Country',
            companyAddressLineOne: 'Some Building',
            currencyCompanyProfessionInsuranceValue: 'USD',
            companyProfessionInsuranceValue: 1000000,
            currencyCompanyPublicInsurancesValue: 'USD',
            companyPublicInsurancesValue: 5000000,
            currencyCompanyEmployerInsuranceValue: 'USD',
            companyEmployerInsuranceValue: 10000000
        },
        status: 0
    }]
};
