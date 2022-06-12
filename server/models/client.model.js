const client = require('mongoose');
const Schema = client.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');

const schema = new client.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    jobTitle: {
        type: String,
        min: 2,
        max: 30
    },
    postcode: {
        type: String
    },
    addressLineOne: {
        type: String
    },
    addressLineTwo: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    timeZone: {
        type: String
    },
    jobRole: {
        type: String,
        enum: Constants.CLIENT.ROLE
    },
    version: {
        type: String,
        default: 'v2'
    },
    registerType: {
        type: String,
        enum: Constants.CLIENT_TYPES,
        default: Constants.CLIENT_TYPES[1]
    },
    billing: {
        type: {
            type: String,
            enum: Constants.CLIENT_TYPES
        },
        companyDetails: {
            logo: {
                type: String
            },
            name: {
                type: String
            },
            brand: {
                type: String
            },
            registeredNumber: {
                type: String
            },
            addressLineOne: {
                type: String
            },
            addressLineTwo: {
                type: String
            },
            city: {
                type: String
            },
            country: {
                type: String
            },
            postcode: {
                type: String
            },
            website: {
                type: String
            },
            vatNumber: {
                type: String
            },
            industry: {
                type: String
            },
            companyType: {
                type: String
            },
            cultures: {
                type: Array
            },
            portfolioUrl: {
                type: String
            },
            linkedInUrl: {
                type: String
            },
            gitHubUrl: {
                type: String
            },
            stackOverFlowUrl: {
                type: String
            },
            behanceUrl: {
                type: String
            },
            dribbbleUrl: {
                type: String
            }
        },
        companyLocation: [{
            locationName: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            },
            addressLineOne: {
                type: String
            },
            addressLineTwo: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            timezone: {
                type: String
            }
        }],
        companyInsurance: {
            professionInsuranceValue: {
                type: Number
            },
            publicInsurancesValue: {
                type: Number
            },
            employerInsuranceValue: {
                type: Number
            }
        },
        companyDocument: {
            incorporationCertificateUrl: {
                type: String
            },
            vatRegistrationCertificateUrl: {
                type: String
            },
            insuranceDocumentUrl: {
                type: String
            }
        }
    },
    authority: {
        firstName: {
            type: String,
            min: 2,
            max: 30
        },
        lastName: {
            type: String,
            min: 2,
            max: 30
        },
        email: {
            type: String
        },
        countryCode: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        jobTitle: {
            type: String,
            min: 2,
            max: 30
        },
        postcode: {
            type: String
        },
        addressLineOne: {
            type: String
        },
        addressLineTwo: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        timeZone: {
            type: String
        }
    },
    pay: {
        type: {
            type: String,
            enum: Constants.PAY_OUT_TYPE
        },
        payPalEmail: {
            type: String
        },
        bankDetails: {
            name: {
                type: String
            },
            accNumber: {
                type: String
            },
            bankCode: {
                type: String
            }
        }
    },
    signupStep: {
        type: Number, // 1 = about you, 2 = company detail, 3 = company location
        default: 0
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = unregister, 1 = active, 2 = suspended
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = client.model('client', schema);
