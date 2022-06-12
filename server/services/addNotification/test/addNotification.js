module.exports = {
    add: [{
        it: 'Notification for Brief Added',
        options: {
            notificationType: 'BRIEF_ADDED',
            jobPostId: '6007ff9d943c7713b49144b0'
        },
        status: 0
    },
    {
        it: 'Notification for talent Added',
        options: {
            notificationType: 'TALENT_ADDED',
            talentId: '5f523e4a7e416a76f64ea920',
            clientId: '5f08589760b8ea193e426d5f'
        },
        status: 0
    },
    {
        it: 'Notification for quote Added',
        options: {
            notificationType: 'NEW_QUOTE',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '6007ff9d943c7713b49144b0'
        },
        status: 0
    }, {
        it: 'Notification for Submit timesheet',
        options: {
            notificationType: 'TIMESHEET_SUBMIT',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '5f523e4a7e416a76f64ea920',
            timesheetId: '6007ff9d943c7713b49144b0',
            projectId: '5f2abf4364712b10ad0e8e3c'
        },
        status: 0
    },
    {
        it: 'Notification for Submit approve',
        options: {
            notificationType: 'TIMESHEET_APPROVED',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '5f523e4a7e416a76f64ea920',
            timesheetId: '6007ff9d943c7713b49144b0'
        },
        status: 0
    }, {
        it: 'Notification for Submit inreview',
        options: {
            notificationType: 'TIMESHEET_INREVIEW',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '5f523e4a7e416a76f64ea920',
            timesheetId: '6007ff9d943c7713b49144b0'
        },
        status: 0
    }, {
        it: 'Notification for Submit settled',
        options: {
            notificationType: 'TIMESHEET_SETTELED',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '5f523e4a7e416a76f64ea920',
            timesheetId: '6007ff9d943c7713b49144b0',
            projectId: '5f2abf4364712b10ad0e8e3c'
        },
        status: 0
    }],
    fail: [{
        it: 'Notification for validation',
        options: {
            notificationType: 'TIMESHEET_SETTELED_1',
            jobPostId: '6007ff9d943c7713b49144b0',
            talentId: '5f523e4a7e416a76f64ea920',
            timesheetId: '6007ff9d943c7713b49144b0',
            projectId: '5f2abf4364712b10ad0e8e3c'
        },
        status: 0
    }]
};
