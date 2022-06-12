const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;


const schema = new appMongoose.Schema({
    quoteId: {
        type: Schema.Types.ObjectId,
        ref: 'quote'
    },
    quotePublishedDate: {
        type: Date
    },
    briefId: {
        type: Schema.Types.ObjectId,
        ref: 'jobPost'
    },
    briefPublishedDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = appMongoose.model('visithistory', schema, 'visithistory');
