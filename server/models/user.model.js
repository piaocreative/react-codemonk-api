const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        min: 2,
        max: 30
    },
    lastName: {
        type: String,
        min: 2,
        max: 30
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0 = deactive, 1 = active, 2 = suspended
    },
    otp: {
        type: Number,
        default: 0
    },
    phoneOtp: {
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetExpiryTime: {
        type: Date
    },
    isDelete: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    role: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6] // 1 = Talent, 2 = Client, 3 = Agency, 4 = admin, 5 = recruiter, 6 = ambassador
    },
    requestedCountryCode: {
        type: String
    },
    requestedPhoneNumber: {
        type: String
    },
    requestedEmail: {
        type: String
    },
    requestChangeEmail: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    quoteLastVisited: {
        type: Date,
        default: Date.now
    },
    briefLastVisited: {
        type: Date,
        default: Date.now
    },
    timesheetLastVisited: {
        type: Date,
        default: Date.now
    },
    notificationLastVisited: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.path('email').required(true, 'User email cannot be blank');

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
module.exports = appMongoose.model('user', schema);
