module.exports = {
    changeTalentInterviewStatus: [{
        it: 'As a admin I should validate change interview status request must be there',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview status request must be blank',
        options: {
            interviewId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview status request must be valid',
        options: {
            interviewId: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview status request must there',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview status request must be valid',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview status request must be valid from allowed status',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de',
            status: 3
        },
        status: 0
    }]
};
