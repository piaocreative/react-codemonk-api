module.exports = {
    saveLater: [
        {
            it: 'As a user, I should validate step key is not passed minimum',
            options: {
                'step': 0
            },
            status: 0
        },
        {
            it: 'As a user, I should validate step max number',
            options: {
                'step': 8
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 1 with invalid gender personal data',
            options: {
                step: 1,
                firstName: 'Talent',
                lastName: 'Last',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'demo',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                language: [{
                    name: 'en', rate: 8
                }],
                timeZone: 'Asia/Kolkata'
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 1 with invalid professional data',
            options: {
                step: 1,
                professionalSummary: 'hello this is testing',
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'demo',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 5 with preference project details',
            options: {
                step: 5,
                'teamPreference': [
                    'demo'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime']
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 5 with preference project details',
            options: {
                step: 5,
                'teamPreference': [
                    'demo'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime']
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 5 with preference project details',
            options: {
                step: 5,
                'teamPreference': [
                    'demo'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime']
            },
            status: 0
        },
        {
            it: 'As a user, I should validate step key is not passed minimum',
            options: {
                'step': 0
            },
            status: 0
        },
        {
            it: 'As a user, I should validate step max number',
            options: {
                'step': 8
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 1 with invalid gender personal data',
            options: {
                step: 1,
                firstName: 'Talent',
                lastName: 'Last',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'demo',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                language: [{
                    name: 'en', rate: 8
                }],
                timeZone: 'Asia/Kolkata'
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 1 with invalid professional data',
            options: {
                step: 1,
                professionalSummary: 'hello this is testing',
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'demo',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 5 with preference project details',
            options: {
                step: 5,
                'teamPreference': [
                    'demo'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime'],
                'availability': true,
                'unavailability': [
                    {
                        'date': '2020-04-06T05:16:08.717Z',
                        'key': 'full'
                    },
                    {
                        'date': '2020-04-07T05:16:08.717Z',
                        'key': 'first'
                    },
                    {
                        'date': '2020-04-08T05:16:08.717Z',
                        'key': 'second'
                    }
                ]
            },
            status: 0
        },
        {
            it: `As a user, I should not be able to save step 7 with
                valid billing type as company but as partial object`,
            options: {
                step: 6,
                employmentType: 'freelancer-consultant',
                billingType: 'company'
            },
            status: 0
        },
        {
            it: `As a user, I should not be able to save step 7 with
                valid pay type as paypal but as partial object`,
            options: {
                step: 6,
                payType: 'paypal'
            },
            status: 0
        },
        {
            it: `As a user, I should not be able to save step 7 with
                valid pay type as bank but as partial object`,
            options: {
                step: 6,
                payType: 'bank'
            },
            status: 0
        }
    ]
};
