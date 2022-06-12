const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const TestCase = require('./talentStatusAdd');
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Add talent to a Job brief', () => {
    try {
        TestCase.addTalentToJobBrief.admin.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .post('/v2/job-post/talent/status')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, data.statusCode);
                assert.equal(res.body.status, data.status);
            });
        });
        TestCase.addTalentToJobBrief.client.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .post('/v2/job-post/talent/status')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, data.statusCode);
                assert.equal(res.body.status, data.status);
            });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

