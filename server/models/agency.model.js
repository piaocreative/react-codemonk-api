const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = appMongoose.Schema;

const schema = new appMongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    designation: {
        type: String,
        min: 2,
        max: 30
    },
    agency: {
        name: {
            type: String,
            min: 2,
            max: 50
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
        duns: {
            type: String
        },
        vatNumber: {
            type: String
        }
    },
    trading: {
        name: {
            type: String,
            min: 2,
            max: 50
        },
        website: {
            type: String
        },
        summary: {
            type: String,
            min: 50,
            max: 1000
        },
        logo: {
            type: String
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
        }
    },
    payDetails: {
        bankName: {
            type: String,
            min: 2,
            max: 50
        },
        accNumber: {
            type: String,
            min: 2,
            max: 40
        },
        bankCode: {
            type: String,
            min: 2,
            max: 50
        }
    },
    incorporationCertificateUrl: {
        type: String
    },
    taxRegistrationCertificateUrl: {
        type: String
    },
    utilityBillDocumentUrl: {
        type: String
    },
    directors: [{
        firstName: {
            type: String,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            min: 2,
            max: 50
        },
        dob: {
            type: Date
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
        isDirector: {
            type: Boolean
        },
        isShareHolder: {
            type: Boolean
        },
        holdingPercent: {
            type: Number,
            max: 100
        }
    }],
    directorDocuments: [{
        idProofUrl: {
            type: String
        },
        addressProofUrl: {
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
        }
    }],
    socialProfile: {
        linkedInUrl: {
            type: String
        },
        gitHubUrl: {
            type: String
        },
        dribbbleUrl: {
            type: String
        },
        clutchUrl: {
            type: String
        },
        goodfirmsUrl: {
            type: String
        },
        otherWebsiteUrl: {
            type: String
        }
    },
    signupStep: {
        type: Number // 0.1 = Registeration type,  1 = profile
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = deactive, 1 = active, 2 = suspended
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
module.exports = appMongoose.model('agency', schema);
