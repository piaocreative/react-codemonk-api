const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentRegisterType');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Agency User
const agencyUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Talent Project details', () => {
    try {
        TestCase.registerType.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/register-type')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user I can choose talent register type', async () => {
            const registerType = {
                registerType: 'freelancer'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/register-type')
                .set({ Authorization: requestPayload.token })
                .send(registerType);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user I can choose agency register type', async () => {
            const registerType = {
                registerType: 'agency'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/register-type')
                .set({ Authorization: requestPayload.token })
                .send(registerType);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

