const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Recruiter user
const recruiter = {
    id: '620a449b8ecd7f654bf64b87',
    email: 'recruiter@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(recruiter, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Recruiter get job post list', () => {
    try {

        it('As a Recruiter, I can get job post list based on query params', async () => {
            const query = {
                status: -1,
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on query params - test 2', async () => {
            const query = {
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on query params - test 3', async () => {
            const query = {
                status: 1
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on workPreference filter', async () => {
            const query = {
                workPreference: 'fulltime,parttime-weekdays-am'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on teamPreference filter', async () => {
            const query = {
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on assignments filter', async () => {
            const query = {
                assignments: 'remote-only,occational-site-visit',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on assignments filter', async () => {
            const query = {
                datePosted: 'Last 7 days',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Recruiter, I can get job post list based on assignments filter - Test 2', async () => {
            const query = {
                datePosted: 'Last 24 hours',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a Recruiter, I can get job post list based on assignments filter - Test 3', async () => {
            const query = {
                datePosted: 'Last 14 days',
                applied: 'Applied'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a Recruiter, I can get job post list based on assignments filter - Test 4', async () => {
            const query = {
                datePosted: 'Last 30 days',
                applied: 'Not Applied'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

