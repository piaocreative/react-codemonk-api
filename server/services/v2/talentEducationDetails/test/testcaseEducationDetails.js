module.exports = {
    addEducation: [{
        it: 'As a user, I should not be able to add education object with only degreelevel',
        options: {
            degreeLevel: 'Master’s or Higher'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel and degreeTitle`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle & collegeName`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle , collegeName & country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle , collegeName , country & startdate`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startYear: 2019
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
            object start date is greater`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startYear: 2020,
            endYear: 2019
        },
        status: 0
    }],
    deleteEducation: [{
        it: 'As a user, I should not be able to delete education object with wrong id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editEducation: [{
        it: 'As a user, I should not be able to edit education object with only degreelevel',
        options: {
            degreeLevel: 'Master’s or Higher'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel and degreeTitle`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle & collegeName`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle , collegeName & country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle , collegeName , country & startdate`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with invalid country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'demo',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
                object start date is greater`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startDate: '14/06/2020',
            endDate: '14/06/2019'
        },
        status: 0
    }]
};
