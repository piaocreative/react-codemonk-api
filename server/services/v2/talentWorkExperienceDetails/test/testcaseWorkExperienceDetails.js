module.exports = {
    addWorkExperience: [{
        it: 'As a user, I should not be able to add partial work experience',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with only jobTitle',
        options: {
            jobTitle: 'Software Engineer'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience with
            jobTitle and employmentType`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType and employer`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType, employer and country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType, employer, country and startDate`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience without shortDescription',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with invalid country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with invalid country',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with invalid date',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2018',
            shortDescription: 'I was software developer'
        },
        status: 0
    }],
    deleteWorkExperience: [{
        it: 'As a user, I should not be able to delete work experience object with blank id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editWorkExperience: [{
        it: 'As a user, I should not be able to edit partial work experience',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with only jobTitle',
        options: {
            jobTitle: 'Software Engineer'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience with
            jobTitle and employmentType`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType and employer`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType, employer and country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType, employer, country and startDate`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience without shortDescription',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with invalid country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with invalid country',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with invalid date',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2018',
            shortDescription: 'I was software developer'
        },
        status: 0
    }]
};
