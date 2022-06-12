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
    title: {
        type: String
    },
    message: {
        type: String
    },
    notificationType: {
        type: String
    },
    metaData: {
        jobPostId: {
            type: Schema.Types.ObjectId
        },
        projectId: {
            type: Schema.Types.ObjectId
        },
        talentId: {
            type: Schema.Types.ObjectId
        },
        quoteId: {
            type: Schema.Types.ObjectId
        },
        timesheetId: {
            type: Schema.Types.ObjectId
        }
    },
    isRead: {
        type: Number,
        default: 0,
        enum: [0, 1] // 0 = unread, 1 = read
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = appMongoose.model('notification', schema);
