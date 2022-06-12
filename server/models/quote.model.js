const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new mongoose.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    quoteUrl: {
        type: String
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    agencies: [{
        agencyId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        status: {
            type: Number,
            default: 0,
            enum: [0, 1]
            // 0 = Inactive, 1 = Active, 2 = close
        }
    }],
    isArchived: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = mongoose.model('quote', schema);
