const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;


const schema = new appMongoose.Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    timesheetId: {
        type: Schema.Types.ObjectId,
        ref: 'timesheet'
    },
    timesheetPublishedDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = appMongoose.model('timesheetHistory', schema);
