module.exports = {
    addProject: [{
        it: 'As a user, I should not be able to add partial project object',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with only name',
        options: {
            name: 'CodeMonk',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with name and description',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object without role',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: '',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object invalid role',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'invalid role',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object without keyachivements',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'Developer',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with invalid url',
        options: {
            name: 'CodeMonk',
            url: 'Invalid url',
            description: 'This is for devlopers',
            role: 'Developer',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with wrong role',
        options: {
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object without employmentType',
        options: {
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    }],
    deleteProject: [{
        it: 'As a user, I should not be able to add project object with wrong role',
        options: {
            _id: ''
        },
        status: 0
    }],
    editProject: [{
        it: 'As a user, I should not be able to edit project object with only name',
        options: {
            name: 'CodeMonk',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with name and description',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object without keyachivements',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'Developer',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with invalid url',
        options: {
            name: 'CodeMonk',
            url: 'Invalid url',
            description: 'This is for devlopers',
            role: 'Developer',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with wrong role',
        options: {
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with wrong id',
        options: {
            id: 'abc',
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object without employment type',
        options: {
            id: 'abc',
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    }]
};
