const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    type: {
        type: String
    },
    prefix: {
        type: String
    },
    length: {
        type: Number
    },
    number: {
        type: Number
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = appMongoose.model('autogenerator', schema);
