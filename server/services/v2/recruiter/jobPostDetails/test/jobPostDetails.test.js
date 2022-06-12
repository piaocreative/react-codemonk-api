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

describe('Get job post details', () => {
    try {
        it('As a recruiter, I can\'t get job post details that not exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/5f97c8f0a350e416d1a5ebad')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a recruiter, I get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/job-post/5f97c8e2a350e416d1a5ebac')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

