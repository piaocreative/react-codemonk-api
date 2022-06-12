const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = appMongoose.Schema;

const schema = new appMongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 50
    },
    type: {
        type: String,
        default: 'Company',
    },
    website: {
        type: String
    },
    summary: {
        type: String,
        min: 50,
        max: 1000
    },
    logo: {
        type: String
    },
    postcode: {
        type: String
    },
    addressLineOne: {
        type: String
    },
    addressLineTwo: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = deactive, 1 = active, 2 = suspended
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
schema.index({ country: 1, name: 1 }, { unique: true });

module.exports = appMongoose.model('company', schema);
