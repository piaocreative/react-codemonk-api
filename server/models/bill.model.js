const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    billDate: {
        type: Date,
        default: Date.now
    },
    billNumber: {
        type: String
    },
    dateStart: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    vatNumber: {
        type: String
    },
    timesheet: [{

        talentName: {
            type: String
        },
        projectName: {
            type: String
        },
        dayOfWeek: {
            type: String
        },
        day: {
            type: Number
        },
        hours: {
            type: Number
        },
        minutes: {
            type: Number
        },
        rate: {
            type: Number
        },
        vat: {
            type: Number
        },
        vatAmount: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    subTotal: {
        type: Number
    },
    totalVat: {
        type: Number
    },
    totalAmount: {
        type: Number
    },

    projectName: {
        type: String
    },
    bankName: {
        type: String
    },
    bankAccount: {
        type: String
    },
    bankCode: {
        type: String
    },
    paypalId: {
        type: String
    },
    stripeId: {
        type: String
    },
    transferWiseId: {
        type: String
    },
    payoneerId: {
        type: String
    },
    currency: {
        type: String
    },
    filePath: {
        type: String
    },
    companyName: {
        type: String
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
module.exports = appMongoose.model('bill', schema);
