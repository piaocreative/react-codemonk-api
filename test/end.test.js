const chai = require('chai');
const assert = chai.assert;
const User = require('../server/models/user.model');
const Talent = require('../server/models/talent.model');
const Client = require('../server/models/client.model');
const Agency = require('../server/models/agency.model');
const Project = require('../server/models/project.model');
const AgencyTalent = require('../server/models/agencyTalent.model');
const Interview = require('../server/models/interview.model');
const JobPost = require('../server/models/jobPost.model');
const Quote = require('../server/models/quote.model');
const VisitHistory = require('../server/models/visitHistory.model');
const Timesheet = require('../server/models/timesheet.model');
const Skills_Col = require('../server/models/skills_col.model');
const Industry = require('../server/models/industry.model');
const CompanyCulture = require('../server/models/companyCulture.model');
const AutoGenerator = require('../server/models/autoGenerator.model');
const Recruiter = require('../server/models/recruiter.model');
const Eventlog = require('../server/models/eventlog.model');
const Ambassador = require('../server/models/ambassador.model');



describe('Delete records after test case executed', () => {

    it('Delete user records after test complete', (done) => {
        Promise.all([
            User.deleteMany(),
            Talent.deleteMany(),
            Client.deleteMany(),
            Project.deleteMany(),
            Agency.deleteMany(),
            AgencyTalent.deleteMany(),
            Interview.deleteMany(),
            JobPost.deleteMany(),
            Quote.deleteMany(),
            VisitHistory.deleteMany(),
            Timesheet.deleteMany(),
            Skills_Col.deleteMany(),
            Industry.deleteMany(),
            CompanyCulture.deleteMany(),
            AutoGenerator.deleteMany(),
            Recruiter.deleteMany(),
            Eventlog.deleteMany(),
            Ambassador.deleteMany()
        ]).then(() => {
            done();
        }).catch(() => {
            assert(true, false);
        });
    });
});
