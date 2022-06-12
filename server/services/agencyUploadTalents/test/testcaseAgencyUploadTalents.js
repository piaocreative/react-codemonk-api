module.exports = {
    talentsUpload: [{
        it: 'As a agency I should not upload a valid file',
        options: {
        },
        status: 0
    },
    {
        it: 'As a agency I should not upload a invalid file',
        options: {
            'fileName': 'agency-talents',
            'filePath': 'test/mock-data/mock-data.js'
        },
        status: 0
    }]
};
