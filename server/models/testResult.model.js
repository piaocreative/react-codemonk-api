const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;
const { TIMESHEET: {
    STATUS_LIST, STATUS: { DRAFT }, VALID_VALUES
} } = require('../util/constants');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    
    talentId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    evaluationId:{
        type: String,
       
    },

    testId:{
        type: String,
       
    },

    name:{
        type: String,
       
    },
    status: {
        type: String,
       
    },
    submitReason: {
        type: String,
       
    },
    rating: {
        type: Number,
       
    },
    timeTaken: {
        type: Number,
       
    },
    attemptTime: {
        type: Number,
       
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

});
schema.plugin(aggregatePaginate);
schema.index({ talentId: 1, evaluationId: 1 });

module.exports = appMongoose.model('testResult', schema);
