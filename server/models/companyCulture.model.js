const appMongoose = require('mongoose');
const schema = new appMongoose.Schema({
    name: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = appMongoose.model('companycultures', schema);
