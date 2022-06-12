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
            it: 'As a user, I should not be able to save step 2 with invalid professional data',
            options: {
                step: 2,
                professionalSummary: 'hello this is testing',
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'demo',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                skills: [{
                    name: 'Node',
                    rate: 7
                },
                {
                    name: 'NoSQL',
                    rate: 7
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 3 with invalid role project details',
            options: {
                step: 3,
                'projectDetails': [
                    {
                        'name': 'CodeMonk',
                        'description': 'This is for devlopers',
                        'role': 'demo',
                        'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time'
                    }
                ]
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 3 with invalid url',
            options: {
                step: 3,
                'projectDetails': [
                    {
                        'name': 'CodeMonk',
                        'url': 'codemonk.ai',
                        'description': 'This is for devlopers',
                        'role': 'Developer',
                        'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time'
                    }
                ]
            },
            status: 0
        },
        {
            it: `As a user, I shouldnt be able to save step 4 with workExperience details
                with employmentType passed incorrectly`,
            options: {
                step: 4,
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'demo',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 4 with  workExperience details',
            options: {
                step: 4,
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 6 with preference project details',
            options: {
                step: 6,
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
            it: 'As a user, I should be able to save step 6 with preference project details',
            options: {
                step: 6,
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
            it: 'As a user, I should be able to save step 6 with preference project details',
            options: {
                step: 6,
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
            it: 'As a user, I should not be able to save step 2 with invalid professional data',
            options: {
                step: 2,
                professionalSummary: 'hello this is testing',
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'demo',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                skills: [{
                    name: 'Node',
                    rate: 7
                },
                {
                    name: 'NoSQL',
                    rate: 7
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 3 with invalid role project details',
            options: {
                step: 3,
                'projectDetails': [
                    {
                        'name': 'CodeMonk',
                        'description': 'This is for devlopers',
                        'role': 'demo',
                        'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time'
                    }
                ]
            },
            status: 0
        },
        {
            it: 'As a user, I should not be able to save step 3 with invalid url',
            options: {
                step: 3,
                'projectDetails': [
                    {
                        'name': 'CodeMonk',
                        'url': 'codemonk.ai',
                        'description': 'This is for devlopers',
                        'role': 'Developer',
                        'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time'
                    }
                ]
            },
            status: 0
        },

        {
            it: `As a user, I shouldnt be able to save step 4 with workExperience details
                with employmentType passed incorrectly`,
            options: {
                step: 4,
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'demo',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 4 with  workExperience details',
            options: {
                step: 4,
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user, I should be able to save step 6 with preference project details',
            options: {
                step: 6,
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
                step: 7,
                billingType: 'company'
            },
            status: 0
        },
        {
            it: `As a user, I should not be able to save step 7 with
                valid pay type as paypal but as partial object`,
            options: {
                step: 7,
                payType: 'paypal'
            },
            status: 0
        },
        {
            it: `As a user, I should not be able to save step 7 with
                valid pay type as bank but as partial object`,
            options: {
                step: 7,
                payType: 'bank'
            },
            status: 0
        }
    ]
};
