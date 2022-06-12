module.exports = {
    certificate: [{
        it: 'As a agency I must not edit certificate details without name',
        options: {
            certificates: [{
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I must not edit certificate details without dateObtained',
        options: {
            certificates: [{
                name: 'AWS Solution Architect',
                issuedBy: 'Amazon'
            }]
        },
        status: 0
    },
    {
        it: 'As a agency I must not edit certificate details without issuedBy',
        options: {
            certificates: [{
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019'
            }]
        },
        status: 0
    }]
};
