const quoteApplication = require('mongoose');
const Schema = quoteApplication.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new quoteApplication.Schema({
    quoteId: {
        type: Schema.Types.ObjectId,
        ref: 'quotes',
        index: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        index: true
    },
    assumptions: {
        type: String,
        min: 2,
        max: 1000
    },
    outOfScope: {
        type: String,
        min: 2,
        max: 1000
    },
    teamStructure: {
        type: String,
        min: 2,
        max: 1000
    },
    projectPlan: {
        type: String
    },
    efforts: {
        type: String
    },
    totalCost: {
        type: Number
    },
    otherInfo: {
        type: String,
        min: 2,
        max: 1000
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
        // 0 = Inactive, 1 = Active
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = quoteApplication.model('quoteApplication', schema);
