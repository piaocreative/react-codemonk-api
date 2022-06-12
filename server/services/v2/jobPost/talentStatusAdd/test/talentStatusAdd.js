const falseDataStatus = 0;
const trueDataStatus = 1;
module.exports = {
    addTalentToJobBrief: {
        admin: [
            {
                it: 'As a admin, adding talent to brief I should validate that must have project id.',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that project id must not be blank',
                options: {
                    jobPostId: '',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that must have talent id',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that talent id must not be blank',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    talentId: '',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that status must be valid',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 'A'
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that status must be minimum value',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: -1
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that status must be maximum character',
                options: {
                    jobPostId: '620e5aea12e4011366db2e22',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 6
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin, adding talent to brief I should validate that talentId must not exists already in project',
                options: {
                    jobPostId: '6213703d08d02d3434f3131d',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a admin I can add talent to project',
                options: {
                    jobPostId: '6213703d08d02d3434f3131d',
                    talentId: '5f155e494a4f44532bcdef69',
                    status: 2
                },
                statusCode: 200,
                status: trueDataStatus
            },
        ],


        client: [
            {
                it: 'As a client, adding talent to brief I should validate that user must not add talent to other project.',
                options: {
                    jobPostId: '61aa0cffaad5a25c272753ef',
                    talentId: '5f523e4a7e416a76f64ea921',
                    status: 4
                },
                statusCode: 400,
                status: falseDataStatus
            },
            {
                it: 'As a client I can add talent to my project',
                options: {
                    jobPostId: '6213703d08d02d3434f3131d',
                    talentId: '5f155daa4a4f44532bcdef67',
                    status: 2
                },
                statusCode: 200,
                status: trueDataStatus
            },
        ]
    },


};
