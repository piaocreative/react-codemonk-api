const project = require('mongoose');
const Schema = project.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');

const schema = new project.Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    name: {
        type: String,
        min: Constants.PROJECT.NAME.LENGTH.MIN,
        max: Constants.PROJECT.NAME.LENGTH.MAX
    },
    description: {
        type: String,
        min: Constants.PROJECT.DESCRIPTION.LENGTH.MIN,
        max: Constants.PROJECT.DESCRIPTION.LENGTH.MIN
    },
    buildStatus: {
        type: String,
        enum: Constants.PROJECT.BUILD_STATUS
    },
    url: {
        type: String
    },
    lookingFor: {
        design: {
            type: [String],
            enum: Constants.PROJECT.LOOKING_FOR.DESING
        },
        softwareDevelopment: {
            type: [String],
            enum: Constants.PROJECT.LOOKING_FOR.SOFTWARE_DEVELOPMENT
        },
        developmentTeam: {
            type: [String],
            enum: Constants.PROJECT.LOOKING_FOR.DEVELOPMENT_TEAM
        },
        dataAiMl: {
            type: [String],
            enum: Constants.PROJECT.LOOKING_FOR.DATA_AI_ML
        },
        isGrowthHacking: {
            type: Boolean
        },
        isAgileCoach: {
            type: Boolean
        },
        other: {
            type: String
        }
    },
    budget: {
        type: String,
        enum: Constants.PROJECT.BUDGET
    },
    messageToPreSales: {
        type: String,
        min: Constants.PROJECT.MESSAGE.LENGTH.MIN,
        max: Constants.PROJECT.MESSAGE.LENGTH.MAX
    },
    speed: {
        type: String,
        enum: Constants.PROJECT.SPEED
    },
    teamManageType: {
        type: String,
        enum: Constants.PROJECT.TEAM_MANAGEMENT
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5, 6, 7]
        // 0 = Requested, 1 = Proposed, 2 = Discovery, 3 = Kick-off, 4 = In Progress, 5 = On Hold, 6 = Suspended, 7 = Closed
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    talents: [{
        talentId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        status: {
            type: Number,
            default: 0,
            enum: [0, 1]
            // 0 = Inactive, 1 = Active
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    teamPreference: {
        type: [String],
        enum: Constants.TEAM_PREFERENCE
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
schema.index({ clientId: 1, name: 1 }, { unique: true });

module.exports = project.model('project', schema);
