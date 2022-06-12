const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = appMongoose.Schema;

const schema = new appMongoose.Schema({
    agencyId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    talents: [{
        firstName: {
            type: String,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            min: 2,
            max: 30
        },
        email: {
            type: String
        },
        currency: {
            type: String
        },
        rate: {
            type: Number
        },
        isInviteAccept: {
            type: Boolean
        }
    }],
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
module.exports = appMongoose.model('agencyTalent', schema);
