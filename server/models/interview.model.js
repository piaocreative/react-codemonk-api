const interview = require('mongoose');
const Schema = interview.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');

const schema = new interview.Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    talentId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        index: true
    },
    name: {
        type: String,
        min: Constants.PROJECT.NAME.LENGTH.MIN,
        max: Constants.PROJECT.NAME.LENGTH.MAX
    },
    description: {
        type: String,
        min: Constants.PROJECT.DESCRIPTION.LENGTH.MIN,
        max: Constants.PROJECT.DESCRIPTION.LENGTH.MIN
    },
    timeSlots: [{
        requestedSlot: {
            type: Date
        },
        isAccepted: {
            type: Number,
            default: 0,
            enum: [0, 1, 2]
            // 0 = Requested, 1 = Accepted, 2 = Declined
        }
    }],
    talentStatus: {
        type: Number,
        enum: [0, 1]
        // 0 = Rejected, 1 = Hired
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2]
        // 0 = Requested, 1 = In Progress, 2 = Done
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    jobPostId: {
        type: Schema.Types.ObjectId,
        ref: 'jobposts',
        index: true
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = interview.model('interview', schema);
