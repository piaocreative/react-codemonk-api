const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const TestCase = require('./recruiterStatusChange');
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

describe('Change recruiter status', () => {
    try {
        TestCase.changeStatus.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/recruiter/status')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin I can change recruiter status', async () => {
            const params = {
                recruiterId: '620b308de128d8fad6ff95cd',
                status: 2
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/recruiter/status')
                .set({ Authorization: requestPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

