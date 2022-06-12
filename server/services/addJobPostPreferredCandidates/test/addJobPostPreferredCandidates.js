module.exports = {
    add: [{
        it: 'As a admin, I should validate job post preferred candidates must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with hard skills must not be blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: []
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with hard skills must be valid',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with hard skills must be less than maximum',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular', 'Node', 'NodeJs', 'Amazon Redshift', 'Java', 'MySQL', 'DevOps', 'SSL']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with soft skills must not be blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: []
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with soft skills must be less than maximum',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs', 'Internet', 'Communication']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with industry must be passed',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with industry must not be blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with industry must not be less than minimum',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'u'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with industry must not be more than maximum',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'IT sector1 IT sector2 IT sector3 IT sector4 IT sector5 IT sector6 IT sector7 IT sector8 IT sector9 IT sector10'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with role must be passed',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with team working must not be blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with team working must not be invalid',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with DISC profile must be passed',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with DISC profile must not be blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with DISC profile must not be an invalid option',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with time zone must not blank',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with time zone must not invalid option',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with rate must be greater than zero',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 0
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with expertise must be passed',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 40
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with currency must not be empty',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 40,
            currency: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with currency must be valid option',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 40,
            currency: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with language must not be empty',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 40,
            currency: 'GBP',
            languages: []
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post preferred candidates with language must be valid option',
        options: {
            id: '60d0aa5c9bd946556f56c10e',
            hardSkills: ['Angular'],
            softSkills: ['Excel', 'Docs'],
            certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
            industry: 'Accounting',
            teamWorking: 'Team Player',
            discProfile: 'D - Style',
            timeZone: 'Asia/Kolkata',
            ratePerHour: 40,
            currency: 'GBP',
            languages: ['ABC']
        },
        status: 0
    }]
};
