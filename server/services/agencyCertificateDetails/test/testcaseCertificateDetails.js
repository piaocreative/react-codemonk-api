module.exports = {
    certificate: [{
        it: 'As a agency I should validate certificate details without name',
        options: {
            certificateDetails: [{
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate certificate details without dateObtained',
        options: {
            certificateDetails: [{
                name: 'AWS Solution Architect',
                issuedBy: 'Amazon'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate certificate details without issuedBy',
        options: {
            certificateDetails: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials linkedIn Url',
        options: {
            linkedInUrl: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials github Url',
        options: {
            gitHubUrl: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials dribble Url',
        options: {
            dribbbleUrl: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials clutch Url',
        options: {
            clutchUrl: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials good firmrs Url',
        options: {
            goodfirmsUrl: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a agency I should validate credentials other Url',
        options: {
            otherWebsiteUrl: 'Invalid'
        },
        status: 0
    }]
};
