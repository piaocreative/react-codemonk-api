module.exports = {
    professionalProfile: [
        {
            it: 'As a user I should validate if  linkedin invalid is passed incorrectly',
            options: {
                linkedInUrl: 'thisisnoturl'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if github invalid is passed incorrectly',
            options: {
                gitHubUrl: 'thisisnoturl'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if stackoverflow invalid is passed incorrectly',
            options: {
                stackOverFlowUrl: 'thisisnoturl'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if gitHub Url is not passed',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if gitHub Url is passed empty',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: ''
            },
            status: 0
        },
        {
            it: 'As a user I should validate if gitHub Url is passed incorrectly',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/in/bill-gates'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if stackoverflow Url is not passed',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if stackoverflow Url is passed incorrectly',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/jon-skeet'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if primary role is not passed',
            options: {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if primary role is as blank',
            options: {
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
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: ''
            },
            status: 0
        }
    ]
};
