module.exports = {
    preferenceDetails: [
        {
            it: 'As a user I should validate if team preference is passed incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['demoteam']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if assignments is passed incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals'],
                assignments: ['demoassignment']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if workPreference is passed incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals'],
                assignments: ['occational-site-visit'],
                workPreference: 'demotime'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if workPreference is passed incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals'],
                assignments: ['occational-site-visit'],
                workPreference: ['demotime']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if teamPreference is passed string incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: 'demo',
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if assignments is passed string incorrectly',
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals'],
                assignments: 'demo',
                workPreference: ['fulltime']
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details teamPreference
         array value passed incorrectly right`,
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals', 'demo'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime']
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details teamPreference
                    array value passed incorrectly left`,
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['demo', 'individuals'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime']
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details assignments
                    array value passed incorrectly`,
            options: {
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term'],
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit', 'demo'],
                workPreference: ['fulltime']
            },
            status: 0
        }
    ]
};
