const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;
const { TIMESHEET: {
    STATUS_LIST, STATUS: { DRAFT }, VALID_VALUES
} } = require('../util/constants');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    referrerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    refereeUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    refereeEmailId: {
        type: String
    },
    referredOn: {
        type: Date,
        default: Date.now
    },
    registeredOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0
    },
    fullNameOfReferee: {
        type: String
    },
    daysOfRefereeActivated: {
        type: Number,
        default: 0
    },
    daysOfRefereeVerified: {
        type: Number,
        default: 0
    },
    daysOfRefereeHired: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

});
schema.plugin(aggregatePaginate);
schema.index({ referrerUserId: 1, refereeUserId: 1 });
schema.index({ refereeEmailId: 1, referrerUserId: 1 });

module.exports = appMongoose.model('referral', schema);
