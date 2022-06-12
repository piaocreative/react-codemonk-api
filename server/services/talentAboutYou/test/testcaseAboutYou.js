module.exports = {
    basicProfile: [{
        it: 'As a user I should validate if first name is not pass',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if first name is not minimum number',
        options: {
            firstName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if first name is greater than maximum number',
        options: {
            firstName: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if last name is not pass',
        options: {
            firstName: 'Talent'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if last name is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if last name is not minimum number',
        options: {
            firstName: 'Talent',
            lastName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if last name is greater than maximum number',
        options: {
            firstName: 'Talent',
            lastName: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country code is not pass',
        options: {
            firstName: 'Talent',
            lastName: 'Last'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country code is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country code is greater than maximum number',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '11111'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is not pass',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if phone number is greater than maximum number',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '123456789012345'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if dob is not minimum number',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if dob is passwed as blank',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if gender is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if gender is as blank',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if gender is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'somegender'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if primary role is as blank',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if primary role  is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: 'someRole'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if years Of Experience is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: 'Developer'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if years Of Experience is as blank',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: 'Developer',
            yearsOfExperience: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if years Of Experience is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: 'Developer',
            yearsOfExperience: 'someyears'
        },
        status: 0
    },
    {
        it: 'As a user I can not save my professional details with empty years Of Experience',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
            gitHubUrl: 'https://github.com/bill-gates',
            stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
            primaryRole: 'Developer',
            yearsOfExperience: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if post code is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if post code is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if address line one is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if address line one is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if city is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if city is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if state is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if city is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if country value is not from the country list',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'Testing'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if language value is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if language value is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            postcode: '380015',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if language value is not from the allowed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: ['zz']
        },
        status: 0
    },
    {
        it: 'As a user I should validate if timezone is not passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en', rate: 8
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if timezone value is passed incorrectly',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en', rate: 8
            }],
            timeZone: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if timezone value is not from the allowed list',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en', rate: 8
            }],
            timeZone: 'test'
        },
        status: 0
    },
    {
        it: 'As a user I can not save my personal details with invalid dob',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '08/31/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en', rate: 8
            }],
            timeZone: 'Asia/Kolkata'
        },
        status: 0
    },
    {
        it: 'As a user I can not save my personal details with invalid language rate',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en',
                rate: 12
            }],
            timeZone: 'Asia/Kolkata'
        },
        status: 0
    },
    {
        it: `As a user I can not save my personal
        details with invalid language name & rate`,
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'demo',
                rate: 12
            }],
            timeZone: 'Asia/Kolkata'
        },
        status: 0
    },
    {
        it: 'As a user I cant save my personal details without language rate',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                name: 'en'
            }],
            timeZone: 'Asia/Kolkata'
        },
        status: 0
    },
    {
        it: 'As a user I cant save my personal details without language name',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India',
            language: [{
                rate: 8
            }],
            timeZone: 'Asia/Kolkata'
        },
        status: 0
    }
    ],
    uploadProfilePicture: [{
        it: 'As a user, I should validate profile picture should not be blank',
        options: {
            'photo': ''
        },
        status: 0
    }]
};
