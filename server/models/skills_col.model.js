const appMongoose = require('mongoose');
const schema = new appMongoose.Schema({
    name: {
        type: String
    },
    hardSkill: {
        type: Number
    }
});

module.exports = appMongoose.model('skillsviews', schema);
