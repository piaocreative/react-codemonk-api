const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');


const schema = new appMongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: Constants.GENDER
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
    state: {
        type: String
    },
    language: [{
        name: {
            type: String
        },
        rate: {
            type: Number,
            min: 1,
            max: 10
        }
    }],
    timeZone: {
        type: String
    },
    signupStep: {
        type: Number
    },
    professionalSummary: {
        type: String,
        min: 50,
        max: 1000
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
    dribbbleUrl: {
        type: String
    },
    behanceUrl: {
        type: String
    },
    portfolioUrl: {
        type: String
    },
    primaryRole: {
        type: String,
        enum: Constants.PRIMARY_ROLE
    },
    yearsOfExperience: {
        type: String,
        enum: Constants.YEAR_OF_EXPERIENCE
    },
    experienceOrder: {
        type: String,
        enum: [0, 1, 2, 3, 4, 5, 6]
    },
    skills: [{
        name: {
            type: String,
            enum: Constants.SKILLS
        },
        rate: {
            type: Number,
            min: 1,
            max: 10
        }
    }],
    projectDetails: [{
        name: {
            type: String,
            min: 2,
            max: 50
        },
        url: {
            type: String
        },
        description: {
            type: String,
            min: 50,
            max: 1000
        },
        role: {
            type: String,
            enum: Constants.PRIMARY_ROLE
        },
        keyAchievements: {
            type: String,
            min: 2,
            max: 500
        },
        employer: {
            type: String
        },
        industry: {
            type: String
        },
        skills: [{
            name: {
                type: String
            },
            rate: {
                type: Number,
                min: 1,
                max: 10
            }
        }],
        images: [{
            name: {
                type: String
            },
            logo: {
                type: String
            },
            isCoverImage: {
                type: Boolean
            }
        }],
        employmentType: {
            type: String,
            enum: Constants.EMPLOYMENT_TYPE,
            min: 2,
            max: 30
        }
    }],
    educationDetails: [{
        degreeLevel: {
            type: String,
            enum: Constants.EDUCATION_DEGREE
        },
        degreeTitle: {
            type: String,
            min: 2,
            max: 50
        },
        collegeName: {
            type: String,
            min: 2,
            max: 50
        },
        country: {
            type: String
        },
        startYear: {
            type: Number
        },
        endYear: {
            type: Number
        },
        logo: {
            type: String
        }
    }],
    certificateDetails: [{
        name: {
            type: String,
            min: 2,
            max: 50
        },
        dateObtained: {
            type: Date
        },
        issuedBy: {
            type: String,
            min: 2,
            max: 50
        },
        certificateId: {
            type: String,
            min: 2
        },
        logo: {
            type: String
        }
    }],
    industries: {
        type: Array
    },
    companyCultures: {
        type: Array
    },
    companyType: {
        type: Array
    },
    preferredProjectDuration: {
        type: Array
    },
    teamPreference: {
        type: Array
    },
    assignments: {
        type: Array
    },
    workPreference: {
        type: [String],
        enum: Constants.WORK_PREFERENCE
    },
    availability: {
        type: Boolean
    },
    unavailability: [{
        date: {
            type: Date
        },
        key: {
            type: String,
            enum: Constants.TIME_HOURS
        }
    }],
    currency: {
        type: String
    },
    ratePerHour: {
        type: Number
    },
    ratePerDay: {
        type: Number
    },
    ratePerMonth: {
        type: Number
    },
    ratePerHourBackUp: {
        type: Number
    },
    currencyAnnualRate: {
        type: String
    },
    annualRate: {
        type: Number
    },
    employmentType: {
        type: [String],
        enum: Constants.TALENT.EMPLOYMENT_TYPE
    },
    idProofUrl: {
        type: String
    },
    addressProofUrl: {
        type: String
    },
    billing: {
        type: {
            type: String,
            enum: Constants.BILLING_TYPES
        },
        companyDetails: {
            name: {
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
            state: {
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
            logo: {
                type: String
            }
        },
        companyInsurance: {
            currencyProfessionInsuranceValue: {
                type: String
            },
            currencyPublicInsurancesValue: {
                type: String
            },
            currencyEmployerInsuranceValue: {
                type: String
            },
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
    workExperience: [{
        jobTitle: {
            type: String,
            min: 2,
            max: 30
        },
        employmentType: {
            type: String,
            enum: Constants.EMPLOYMENT_TYPE,
            min: 2,
            max: 30
        },
        employer: {
            type: String,
            min: 2,
            max: 30
        },
        country: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        shortDescription: {
            type: String,
            min: 2,
            max: 1000
        },
        isPresent: {
            type: Boolean
        },
        logo: {
            type: String
        }
    }],
    registerType: {
        type: String,
        enum: Object.values(Constants.TALENT_REGISTER_TYPE)
    },
    isPaymentSkipped: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = deactive, 1 = active, 2 = suspended
    },
    featureFlag: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    code: {
        type: String
    },
    candidateToken: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    talentCvUrl: {
        type: String
    },
    version: {
        type: String
    },
    verifiedProfile: {
        type: Boolean,
        default: false
    },
    isHiredFirst: {
        type: Boolean,
        default: false
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = appMongoose.model('talent', schema);
