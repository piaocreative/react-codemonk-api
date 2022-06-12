const jobPost = require('mongoose');
const Schema = jobPost.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Constants = require('../util/constants');

const schema = new jobPost.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        index: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: Constants.PRIMARY_ROLE
    },
    skills: {
        type: [String]
    },
    workPreference: {
        type: [String],
        enum: Constants.WORK_PREFERENCE
    },
    teamPreference: {
        type: [String],
        enum: Constants.TEAM_PREFERENCE
    },
    assignments: {
        type: [String],
        enum: Constants.ASSIGNMENTS
    },
    expertise: {
        type: String,
        enum: Constants.YEAR_OF_EXPERIENCE
    },
    expertiseOrder: {
        type: String,
        enum: [0, 1, 2, 3, 4, 5, 6]
    },
    duration: {
        type: Number // In month always
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2]
    },
    featureFlag: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    applications: [{
        talentId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            index: true
            // userId of the talent
        },
        status: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3, 4, 5]
            // 0 = Inactive, 1 = Active, 2 = Interview, 3 = Shortlisted, 4 = Hired, 5 = Rejected
        },
        notesOfMotivation: {
            type: String
        },
        availableJoiningDate: {
            type: Date
        }
    }],
    clientId: {
        type: Schema.Types.ObjectId,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    step: {
        type: Number
    },
    hardSkills: {
        type: [String]
    },
    softSkills: {
        type: [String]
    },
    certifications: {
        type: [String]
    },
    industry: {
        type: String
    },
    teamWorking: {
        type: String
    },
    discProfile: {
        type: String
    },
    timeZone: {
        type: String
    },
    ratePerHour: {
        type: Number
    },
    currency: {
        type: String
    },
    languages: {
        type: [String]
    },
    jobId: {
        type: String
    },
    archivedDate: {
        type: Date
    },
    annualRate: {
        type: Number
    },
    currencyAnnualRate: {
        type: String
    },
    employmentType: {
        type: [String],
        enum: Constants.TALENT.EMPLOYMENT_TYPE
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = jobPost.model('jobPost', schema);
