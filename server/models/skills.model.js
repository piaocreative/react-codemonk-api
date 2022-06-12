const appMongoose = require('mongoose');
const schema = new appMongoose.Schema({
    _id: {
        type: String
    }
});

module.exports = appMongoose.model('skillsview', schema, 'skillsview');
