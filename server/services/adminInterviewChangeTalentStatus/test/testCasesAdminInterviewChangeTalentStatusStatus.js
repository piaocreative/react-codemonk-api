module.exports = {
    changeTalentInterviewStatus: [{
        it: 'As a admin I should validate change interview talent status request must be there',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview talent status request must be blank',
        options: {
            interviewId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview talent status request must be valid',
        options: {
            interviewId: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview talent status request must have status',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview talent status request must have valid status',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate change interview talent status request must have valid status from allowed values',
        options: {
            interviewId: '5f75c1489bdaa265fc6214de',
            status: 2
        },
        status: 0
    }]
};
