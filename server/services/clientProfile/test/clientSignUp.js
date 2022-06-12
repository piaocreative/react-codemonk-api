/* eslint-disable quotes */
/* eslint-disable eol-last */
module.exports = {
    aboutYou: [{
        it: 'As a client I should validate if first name is not pass',
        options: {
        },
        status: 0
    },
    {
        it: 'As a client I should validate if first name is not minimum number',
        options: {
            firstName: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if first name is greater than maximum number',
        options: {
            firstName: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if last name is not pass',
        options: {
            firstName: 'Client'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if last name is passed incorrectly',
        options: {
            firstName: 'Client',
            lastName: ''
        },
        status: 0
    },
    {
        it: 'As a client nt I should validate if last name is not minimum number',
        options: {
            firstName: 'Client',
            lastName: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if country code is not pass',
        options: {
            firstName: 'Client',
            lastName: 'Client last name'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if country code is passed incorrectly',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate if country code is greater than maximum number',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '1234'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if country code is greater than maximum number',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '12345'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if phone number is missed',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if phone number is passed incorrectly',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate if phone number is greater than maximum number',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '123456789012'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if job title is not pass',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '9925461330'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if job title is not minimum number',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '9925461330',
            jobTitle: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if job title is greater than maximum number',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '9925461330',
            jobTitle: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if jobRole is not pass',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '9925461330',
            jobTitle: 'CTO'
        },
        status: 0
    },
    {
        it: 'As a client I should validate if jobRole is passed incorrect',
        options: {
            firstName: 'Client',
            lastName: 'Client last name',
            countryCode: '91',
            phoneNumber: '9925461330',
            jobTitle: 'CTO',
            jobRole: 'manager'
        },
        status: 0
    }],
    companyLocation: [{
        it: "As a client I should validate if locationName is not passed",
        options: {},
        status: 0
    },
    {
        it: "As a client I should validate if postcode is not passed",
        options: {
            locationName: "Subsidary"
        },
        status: 0
    },
    {
        it: "As a client I should validate if county is not passed",
        options: {
            locationName: "Subsidary",
            postcode: "380015"
        },
        status: 0
    },
    {
        it: "As a client I should validate if county is incorrect",
        options: {
            locationName: "Subsidary",
            postcode: "380015",
            country: 'aaa'
        },
        status: 0
    },
    {
        it: "As a client I should validate if addressLine1 is not passed",
        options: {
            locationName: "Subsidary",
            postcode: "380015",
            country: 'India'
        },
        status: 0
    },
    {
        it: "As a client I should validate if city is not passed",
        options: {
            locationName: "Subsidary",
            postcode: "380015",
            country: 'India',
            addressLine1: "Some House, Some Buildding"
        },
        status: 0
    },
    {
        it: "As a client I should validate if timezone is not passed",
        options: {
            locationName: "Subsidary",
            postcode: "380015",
            country: 'India',
            addressLine1: "Some House, Some Buildding",
            city: "Ahmedabad"
        },
        status: 0
    },
    {
        it: "As a client I should validate if timezone is passed incorrectly",
        options: {
            locationName: "Subsidary",
            postcode: "380015",
            country: 'India',
            addressLine1: "Some House, Some Buildding",
            city: "Ahmedabad",
            timeZone: "Europe/LL"
        },
        status: 0
    }],
    aboutCompany: [{
        it: "As a client I should validate if name is not passed",
        options: {},
        status: 0
    },
    {
        it: "As a client I should validate if brand is not passed",
        options: {
            name: "CodeMonk"
        },
        status: 0
    },
    {
        it: "As a client I should validate if registeredNumber is not passed",
        options: {
            name: "CodeMonk",
            brand: "Job Portal"
        },
        status: 0
    },
    {
        it: "As a client I should validate if vatNumber is not passed",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456"
        },
        status: 0
    },
    {
        it: "As a client I should validate if industry is not passed",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356"
        },
        status: 0
    },
    {
        it: "As a client I should validate if industry is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Account"
        },
        status: 0
    },
    {
        it: "As a client I should validate if teamPreference is not passed",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting"
        },
        status: 0
    },
    {
        it: "As a client I should validate if cultures is not passed",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals"
        },
        status: 0
    },
    {
        it: "As a client I should validate if cultures is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, aba"
        },
        status: 0
    },
    {
        it: "As a client I should validate if portfolioUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "ht://fjfjf.com"
        },
        status: 0
    },
    {
        it: "As a client I should validate if linkedInUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "https://codemonk.ai",
            linkedInUrl: "https://google.com"
        },
        status: 0
    },
    {
        it: "As a client I should validate if gitHubUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "https://codemonk.ai",
            linkedInUrl: "https://www.linkedin.com/in/codemonk/",
            gitHubUrl: "https://google.com"
        },
        status: 0
    },
    {
        it: "As a client I should validate if stackOverFlowUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "https://codemonk.ai",
            linkedInUrl: "https://www.linkedin.com/in/codemonk/",
            gitHubUrl: "https://github.com/ghgie",
            stackOverFlowUrl: "https://google.com"
        },
        status: 0
    },
    {
        it: "As a client I should validate if behanceUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "https://codemonk.ai",
            linkedInUrl: "https://www.linkedin.com/in/codemonk/",
            gitHubUrl: "https://github.com/ghgie",
            stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
            behanceUrl: "https://google.com"
        },
        status: 0
    },
    {
        it: "As a client I should validate if dribbbleUrl is passed incorrectly",
        options: {
            name: "CodeMonk",
            brand: "Job Portal",
            registeredNumber: "123456",
            vatNumber: "2223356",
            industry: "Accounting",
            teamPreference: "individuals",
            cultures: "Quality, Trust",
            portfolioUrl: "https://codemonk.ai",
            linkedInUrl: "https://www.linkedin.com/in/codemonk/",
            gitHubUrl: "https://github.com/ghgie",
            stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
            behanceUrl: "https://www.behance.net/gallery",
            dribbbleUrl: "https://google.com"
        },
        status: 0
    }]
};