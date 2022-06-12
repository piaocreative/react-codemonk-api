module.exports = {
    changeStatus: [{
        it: 'As a admin I should validate project talent status change must have project id',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change project id must not be blank',
        options: {
            jobPostId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change must have talent id',
        options: {
            jobPostId: '620e5aea12e4011366db2e22'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change project talent id must not be blank',
        options: {
            jobPostId: '620e5aea12e4011366db2e22',
            talentId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change with status must be valid',
        options: {
            jobPostId: '620e5aea12e4011366db2e22',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must be minimum value',
        options: {
            jobPostId: '620e5aea12e4011366db2e22',
            talentId: '5f523e4a7e416a76f64ea921',
            status: -1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must be maximum character',
        options: {
            jobPostId: '620e5aea12e4011366db2e22',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 6
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must be maximum character',
        options: {
            jobPostId: '620e5aea12e4011366db2e22',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 6
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the same state(applications/applied)',
        options: {
            jobPostId: '6213703d08d02d3434f3131d',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the same state(interview)',
        options: {
            jobPostId: '621370cf92b1bd5d8adf535c',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 2
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(applied)',
        options: {
            jobPostId: '621370cf92b1bd5d8adf535c',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the same state(shortlisted)',
        options: {
            jobPostId: '62137329992e7df843db1ed8',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 3
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(interview)',
        options: {
            jobPostId: '62137329992e7df843db1ed8',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 2
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(applied)',
        options: {
            jobPostId: '62137329992e7df843db1ed8',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(shortlisted)',
        options: {
            jobPostId: '6213738897ae9fbe2b5d0fae',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 3
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(interviewed)',
        options: {
            jobPostId: '6213738897ae9fbe2b5d0fae',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 2
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(applied)',
        options: {
            jobPostId: '6213738897ae9fbe2b5d0fae',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the same state(rejected)',
        options: {
            jobPostId: '621373ad3cb0390204b48c91',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 5
        },
        status: 0
    },
    {
        it: 'As a admin I should validate project talent status change status must not be the previous state(applied)',
        options: {
            jobPostId: '621373ad3cb0390204b48c91',
            talentId: '5f523e4a7e416a76f64ea921',
            status: 1
        },
        status: 0
    }]
};
