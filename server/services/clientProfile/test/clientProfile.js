module.exports = {
    phoneNumber: [{
        it: 'As a user I should validate if country code is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country code is passed incorrectly',
        options: {
            countryCode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country code is greater than maximum number',
        options: {
            countryCode: '11111'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is not passed',
        options: {
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is passed incorrectly',
        options: {
            countryCode: '91',
            phoneNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is greater than maximum number',
        options: {
            countryCode: '91',
            phoneNumber: '123456789012345'
        },
        status: 0
    }],
    verifyPhoneNumber: [{
        it: 'As a user I should validate phone otp is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate phone otp is passed as empty',
        options: {
            otp: 0
        },
        status: 0
    },
    {
        it: 'As a user I should validate otp is passed as below 6 digits',
        options: {
            otp: 1111
        },
        status: 0
    }, {
        it: 'As a user I should validate otp is passed as above 6 digits',
        options: {
            otp: 1234567
        },
        status: 0
    }, {
        it: 'As a client user I can\'t verify my phone number with wrong otp',
        options: {
            otp: 121212
        },
        status: 0
    }],
    profile: [{
        it: 'As a user I should validate client profile object not blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile first name',
        options: {
            firstname: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile first name with space',
        options: {
            firstname: 'Test with Space'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile last name',
        options: {
            firstName: 'Client\'sFirst',
            lastName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile job title',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile post code',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile address line one',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile city',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile country as blank',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile country as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'INVALID'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile timezone as blank',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile timezone as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'INVALID'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company type as balnk',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: ''
        },
        // status: 0
        status: 1
    },
    {
        it: 'As a user I should validate client profile type as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'INVALID'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company name',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company registered number',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company post code number',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company city number',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company contry as blank',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company contry as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'INVALID'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company address line one',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company vat number',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority first name',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority last name',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority email',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority phone number contry code',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: 'authrity@example.com',
            authorityCountryCode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority phone number',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: 'authrity@example.com',
            authorityCountryCode: '91',
            authorityPhoneNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority job title',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: 'authrity@example.com',
            authorityCountryCode: '91',
            authorityPhoneNumber: '9925061220',
            authorityJobTitle: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority time zone as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: 'authrity@example.com',
            authorityCountryCode: '91',
            authorityPhoneNumber: '9925061220',
            authorityJobTitle: 'CEO',
            authorityPostcode: '380015',
            authorityTimeZone: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a user I should validate client profile company authority country as invalid',
        options: {
            firstName: 'Client\'sFirst',
            lastName: 'Client\'s Last',
            jobTitle: 'CTO',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            type: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India',
            companyAddressLineOne: 'Some Building',
            companyAddressLineTwo: 'Some Stree',
            website: 'http://www.codemonk.ai',
            vatNumber: 'ABC',
            authorityFirstName: 'Authority\'sFirst',
            authorityLastName: 'authority\'s Last',
            authorityEmail: 'authrity@example.com',
            authorityCountryCode: '91',
            authorityPhoneNumber: '9925061220',
            authorityJobTitle: 'CEO',
            authorityPostcode: '380015',
            authorityTimeZone: 'Asia/Kolkata',
            authorityAddressLineOne: 'Some House, Some Buildding',
            authorityAddressLineTwo: 'Some Road, Somewhere',
            authorityCity: 'Ahmedabad',
            authorityCountry: 'Invalid'
        },
        status: 0
    }]
};
