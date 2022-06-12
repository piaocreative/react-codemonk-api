module.exports = {
    changeStatus: [{
        it: 'As a admin, I should validate recruiter status change must have recruiter id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate recruiter status change recruiter id must not be blank',
        options: {
            recruiterId: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate recruiter status change with status must not be as blank',
        options: {
            recruiterId: '620b308de128d8fad6ff95cd',
            status: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate recruiter status change with status must be valid',
        options: {
            recruiterId: '620b308de128d8fad6ff95cd',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate recruiter status change status must be minimum value',
        options: {
            recruiterId: '620b308de128d8fad6ff95cd',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate recruiter status change status must be maximum character',
        options: {
            recruiterId: '620b308de128d8fad6ff95cd',
            status: 3
        },
        status: 0
    }]
};
