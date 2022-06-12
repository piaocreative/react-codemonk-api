const ambassador = require('mongoose');
const Schema = ambassador.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');

const schema = new ambassador.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companies',
        index: true
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = unregister, 1 = active, 2 = suspended
    },
    signupStep: {
        type: Number, // 1 = about you, 2 = company detail, 3 = company location
        default: 0
    },
    jobTitle: {
        type: String,
        min: 2,
        max: 30
    },
    registerType: {
        type: String,
        enum: Constants.AMBASSADOR.REGISTER_TYPE,
        default: Constants.AMBASSADOR.REGISTER_TYPE[1]
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
            vatNumber: {
                type: String
            },
            websiteUrl: {
                type: String
            },
            linkedInUrl: {
                type: String
            }
        },
        companyLocation: {
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
        },
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
            enum: Constants.PAYOUT_TYPES
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

module.exports = ambassador.model('ambassador', schema);
