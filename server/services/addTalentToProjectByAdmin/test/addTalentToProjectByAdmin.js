module.exports = {
    add: [{
        it: 'As a admin I should validate add talent to project details must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details talent id must not be blank',
        options: {
            talentId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details talent id must not be valid',
        options: {
            talentId: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details start date must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details start date must not be invalid',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '12/31/2020'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details end date must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '31/12/2020'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project details end date must not be invalid',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '31/12/2020',
            endDate: '12/14/2021'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project id must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '31/12/2020',
            endDate: '12/14/2021'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project id must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '31/12/2020',
            endDate: '12/14/2021',
            projectId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent to project id must not be valid',
        options: {
            talentId: '5f083c352a7908662c334532',
            startDate: '31/12/2020',
            endDate: '12/14/2021',
            projectId: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent must be already added',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: '5f523e4a7e416a76f64ea920',
            startDate: '01/10/2020',
            endDate: '31/12/2021'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add talent must be talent',
        options: {
            projectId: '5f631e56d37cbb4801f0fa45',
            talentId: '5f083c352a7908662c334533',
            startDate: '01/10/2020',
            endDate: '31/12/2021'
        },
        status: 0
    }]
};
