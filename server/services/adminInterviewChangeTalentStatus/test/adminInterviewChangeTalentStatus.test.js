const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testCasesAdminInterviewChangeTalentStatusStatus');
chai.use(chaiHttp);
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

describe('Admin interview status change', () => {
    try {
        TestCase.changeTalentInterviewStatus.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/admin/interview/talent/status')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I can get schedule interview list without passing any parameters', async () => {
            const query = {
                interviewId: '5f75c1489bdaa265fc6214de',
                status: 1
            };
            const res = await request(process.env.BASE_URL)
                .put('/admin/interview/talent/status')
                .set({ Authorization: requestPayload.token })
                .send(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

