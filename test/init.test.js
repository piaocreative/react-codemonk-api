
const request = require('supertest');
const app = require('../server/server');
request(app);
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../server/models/user.model');
const Talent = require('../server/models/talent.model');
const Client = require('../server/models/client.model');
const Agency = require('../server/models/agency.model');
const AgencyTalent = require('../server/models/agencyTalent.model');
const Project = require('../server/models/project.model');
const Interview = require('../server/models/interview.model');
const JobPost = require('../server/models/jobPost.model');
const Quote = require('../server/models/quote.model');
const Industry = require('../server/models/industry.model');
const CompanyCulture = require('../server/models/companyCulture.model');
const AutoGenerator = require('../server/models/autoGenerator.model');
const Eventlog = require('../server/models/eventlog.model');
const Recruiter = require('../server/models/recruiter.model');
const Ambassador = require('../server/models/ambassador.model');
const Timesheet = require('../server/models/timesheet.model');

const UserSeed = require('./seed/user.seed');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('Data seeding', () => {

    it('Check server root url', async () => {
        try {
            request(process.env.BASE_URL)
                .get('/')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 'ok');
                });
        } catch (error) {
            assert.equal(null, error);
        }
    });

    it('Add user data', async () => {
        try {
            await User.insertMany(UserSeed.users);
            await Talent.insertMany(UserSeed.talent);
            await Client.insertMany(UserSeed.client);
            await Agency.insertMany(UserSeed.agency);
            await AgencyTalent.insertMany(UserSeed.agencyTalent);
            await Project.insertMany(UserSeed.project);
            await Interview.insertMany(UserSeed.interviews);
            await JobPost.insertMany(UserSeed.jobPosts);
            await Quote.insertMany(UserSeed.quotes);
            await Industry.insertMany(UserSeed.industries);
            await CompanyCulture.insertMany(UserSeed.cultures);
            await AutoGenerator.insertMany(UserSeed.autoGenerator);
            await Eventlog.insertMany(UserSeed.eventlog);
            await Recruiter.insertMany(UserSeed.recruiter);
            await Ambassador.insertMany(UserSeed.ambassador);
            await Timesheet.insertMany(UserSeed.timesheet);
        } catch (error) {
            assert.equal(null, error);
        }
    });


});
