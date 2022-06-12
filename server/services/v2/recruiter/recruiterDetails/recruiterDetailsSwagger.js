const message = require('../../../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/v2/recruiter/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Recruiter(v2)'
            ],
            parameters: [{
                in: 'path',
                name: 'id',
                description: 'Id of recruiter'
            }],
            description: 'Get recruiter details',
            summary: 'Get recruiter details',
            responses: {
                200: {
                    description: 'Get recruiter details',
                    schema: {
                        $ref: '#/definitions/recruiterDetailsuccess'
                    }
                },
                400: {
                    description: message.INVALID_BRIEF_REQUEST,
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ERROR_MSG
            }
        }
    };

    swaggerJson.definitions.validationError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.INVALID_BRIEF_REQUEST
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccess = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ACCESS_DENIED
            }
        }
    };

    swaggerJson.definitions.recruiterDetailsuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    _id: '5f05c941aff1590c69b00907',
                    firstName: 'Main',
                    lastName: 'recruiter',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    authority: {
                        addressLineOne: 'Some House, Some Buildding',
                        addressLineTwo: 'Some Road, Somewhere',
                        city: 'Ahmedabad',
                        country: 'India',
                        countryCode: '91',
                        email: 'authrity@example.com',
                        firstName: 'Authority\'sFirst',
                        jobTitle: 'CEO',
                        lastName: 'authority\'s Last',
                        phoneNumber: '9925061221',
                        postcode: '380015',
                        timeZone: 'Asia/Kolkata'
                    },
                    billing: {
                        type: 'company',
                        companyDetails: {
                            addressLineOne: 'Some Building',
                            addressLineTwo: 'Some Stree',
                            city: 'Ahmedabad',
                            country: 'India',
                            name: 'Soft Silicon',
                            registeredNumber: 'ABC',
                            vatNumber: 'ABC',
                            website: 'http://www.codemonk.ai',
                            postcode: '380015'
                        },
                        companyInsurance: {
                            professionInsuranceValue: 100000,
                            publicInsurancesValue: 900000,
                            employerInsuranceValue: 6000000
                        },
                        companyDocument: {
                            incorporationCertificateUrl: 'openw.jpg',
                            vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/big.jpg',
                            insuranceDocumentUrl: 'companyInsuranceDocumentUrl/men.jpg'
                        }
                    },
                    registerType: 'company',
                    city: 'Ahmedabad',
                    country: 'India',
                    jobTitle: 'CTO',
                    postcode: '380015',
                    timeZone: 'Asia/Kolkata',
                    pay: {
                        type: 'bank',
                        bankDetails: {
                            name: 'Kotak',
                            accNumber: 'ABC',
                            bankCode: 'KT11234'
                        }
                    },

                    recruiterUserId: '5f05c940aff1590c69b00906',
                    status: 'Active'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
