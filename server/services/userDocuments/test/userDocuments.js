module.exports = {
    documentUpload: [{
        it: 'As a user, I should validate atlist one file is uploaded',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user, I should validate atlist one file is uploaded',
        options: {
            'fileName': '',
            'filePath': ''
        },
        status: 0
    },
    {
        it: 'As a user, I should validate atlist one file is uploaded',
        options: {
            'fileName': 'idProof',
            'filePath': 'test/mock-data/mock-data.js'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate user document should not be less than 10kb',
        options: {
            'fileName': 'idProof',
            'filePath': 'test/mock-data/lessthan10kb.pdf'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate user document should no be more than 5 mb',
        options: {
            'fileName': 'idProof',
            'filePath': 'test/mock-data/5_8mb_file.jpeg'
        },
        status: 0
    }],
    documentDelete: [{
        it: 'As a user, I should validate user document not passed in delete request',
        options: {},
        status: 0
    },
    {
        it: 'As a user, I should validate user document passed as empty in delete request',
        options: {
            document: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should validate user document passed as invalid in delete request',
        options: {
            document: 'somefile'
        },
        status: 0
    }]
};
