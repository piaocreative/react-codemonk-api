const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./addJobPostEngagement');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;
const falseDataStatus = 0;

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Admin add job post with preferred candidates', () => {
    try {
        TestCase.add.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/job-post/preferred-candidates')
                    .set({ Authorization: adminPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I should able to add job post with preferred candidates', async () => {
            const JobPostDetails = {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40,
                currency: 'GBP',
                languages: ['English']
            };

            const res = await request(process.env.BASE_URL)
                .post('/job-post/preferred-candidates')
                .set({ Authorization: adminPayload.token })
                .send(JobPostDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
