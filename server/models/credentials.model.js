const appMongoose = require('mongoose');

const schema = new appMongoose.Schema({
    name: {
        type: String
    },
    codeVerifier: {
        type: String
    },
    state: {
        type: String
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
});

module.exports = appMongoose.model('oauthcredentials', schema);
