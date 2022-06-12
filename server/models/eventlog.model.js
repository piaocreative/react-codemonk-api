const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', 
        index: true
    },
    type: {
        type: String,
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }   
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = mongoose.model('eventlog', schema);
