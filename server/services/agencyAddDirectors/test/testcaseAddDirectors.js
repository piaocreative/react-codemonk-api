module.exports = {
    directors: [{
        it: 'As a agency I should validate directors / shareholders empty object',
        options: {
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without first name',
        options: {
            directors: []
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without last name',
        options: {
            directors: [{
                firstName: 'Director one'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without dob',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without zipcode',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without address line one',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without city',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without country',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders without role',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders with role shareholders without holdingPercent',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                isShareHolder: true
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders with role shareholders with hodling <=20',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                isShareHolder: true,
                holdingPercent: 15
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders with role shareholders holdingPercent >100',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                isShareHolder: true,
                holdingPercent: 115
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate directors / shareholders with role shareholders holdingPercent total >100',
        options: {
            directors: [{
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                isShareHolder: true,
                holdingPercent: 51
            },
            {
                firstName: 'Director one',
                lastName: 'Director oneLast',
                dob: '01/12/2000',
                postcode: '380013',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                isShareHolder: true,
                holdingPercent: 51
            }]
        },
        status: 0
    }]
};
