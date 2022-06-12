const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;
const { TIMESHEET: {
    STATUS_LIST, STATUS: { DRAFT }, VALID_VALUES
} } = require('../util/constants');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    talentId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    approver: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    week: {
        _id: false,
        type: [{
            date: {
                type: Date,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            hours: {
                type: Number,
                required: true
            },
            minutes: {
                type: Number,
                required: true
            }
        }]
    },
    dateStart: {
        type: Date,
        required: true
    },
    approvedOn: {
        type: Date
    },
    status: {
        type: Number,
        required: true,
        enum: STATUS_LIST,
        default: DRAFT
    },
    billId: {
        type: Schema.Types.ObjectId,
        ref: 'bill'
    },
    earning: {
        type: Number
    },
    commission: {
        type: Number
    },
    cost: {
        type: Number
    },
    talentVat: {
        type: Number
    },
    clientVat: {
        type: Number
    },
    currency: {
        type: String
    },
    ratePerHour: {
        type: Number
    },
    ratePerDay: {
        type: Number
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    histories: {
        type: [
            new appMongoose.Schema({
                week: {
                    _id: false,
                    type: [{
                        date: {
                            type: Date,
                            required: true
                        },
                        value: {
                            type: Number,
                            required: true
                        },
                        hours: {
                            type: Number,
                            required: true
                        },
                        minutes: {
                            type: Number,
                            required: true
                        }
                    }]
                },
                dateStart: {
                    type: Date
                },
                status: {
                    type: Number,
                    required: true,
                    enum: STATUS_LIST,
                    default: DRAFT
                },
                billId: {
                    type: Schema.Types.ObjectId,
                    ref: 'bill'
                },
                earning: {
                    type: Number
                },
                commission: {
                    type: Number
                },
                cost: {
                    type: Number
                },
                talentVat: {
                    type: Number
                },
                clientVat: {
                    type: Number
                },
                currency: {
                    type: String
                },
                ratePerHour: {
                    type: Number
                },
                ratePerDay: {
                    type: Number
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            })
        ]
    }

});
schema.plugin(aggregatePaginate);
schema.index({ dateStart: 1, status: 1 });

module.exports = appMongoose.model('timesheet', schema);
