module.exports = {
    addCertificate: [{
        it: 'As a user, I should not be able to add certificate object with only name',
        options: {
            name: 'AWS Solution Architect'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name and dateObtained`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name, dateObtained & issuedBy`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with invalid certificateid`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon',
            certificateId: 'A'
        },
        status: 0
    }],
    deleteCertificate: [{
        it: 'As a user, I should not be able to delete certificate object with wrong id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editCertificate: [{
        it: 'As a user, I should not be able to add certificate object with only name',
        options: {
            name: 'AWS Solution Architect'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name and dateObtained`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name, dateObtained & issuedBy`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with invalid certificateid`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon',
            certificateId: 'A'
        },
        status: 0
    }]
};
