module.exports = {
    educationDetails: [{
        it: 'As a user I should validate if education details is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details is as empty',
        options: {
            educationDetails: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details must be array',
        options: {
            educationDetails: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details must be array',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with wrong degree level',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with wrong degree title',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: ''
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with degree title minimum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'a'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with degree title maximum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: `This is something big.This is something big.
                    This is something big.This is something big.This is something big.`
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with degree college name',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: ''
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with degree college name minimum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher', degreeTitle: 'Master in Computer Application',
                collegeName: 'a'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with degree college name maximum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: `This is something big.This is something big.
                    This is something big.This is something big.This is something big.`
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with country is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with country is empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: ''
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with country invalid value',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'some value'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with start date is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India'
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with start date is empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startDate: ''
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with start date is invalid',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 0
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with end date is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 0
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with end date is empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: ''
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education details with end date is invalid',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: -2020
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if education end date is greater than start date',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2021,
                endYear: 2020
            }],
            certificateDetails: []
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details name is passed as empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: ''
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details name is passed as minimum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'a'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details name is passed as maximum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'This is big. This is big. This is big. This is big.'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details date obtained is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details date obtained is empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: ''
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details date obtained is passed as invalid',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '08/30/2019'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details issuedBy is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details issuedBy is passed as empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: ''
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details issuedBy is passed as minimum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'a'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details issuedBy is passed as maximum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'This is big. This is big. This is big. This is big.'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details id/url is not passed',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details id/url is passed as empty',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: ''
            }]
        },
        status: 0
    },
    {
        it: 'As a user I should validate if certificate details id/url is passed as minimum',
        options: {
            educationDetails: [{
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            }],
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: 'a'
            }]
        },
        status: 0
    }]
};
