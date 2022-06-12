const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./changeEmail');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;
const falseDataStatus = 0;

// Client User
const clientuser = {
    id: '5f1e76e1035cad67d670f41f',
    email: 'clientemailchange@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency Talent
const agencyTalentUser = {
    id: '5f523e4a7e416a76f64ea920',
    email: 'talent1@mailinator.com'
};
const agencyTalentPayload = {
    token: jwt.sign(agencyTalentUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('User can change email address', () => {
    try {
        TestCase.email.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/email/change')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency talent user I can\' change my email address', async () => {
            const otpDetails = {
                otp: 123456
            };

            const res = await request(process.env.BASE_URL)
                .put('/user/email/change')
                .set({ Authorization: agencyTalentPayload.token })
                .send(otpDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, falseDataStatus);
            assert.equal(res.statusCode, 400);
        });

        it('As a client user I can\'t change my email address with wrong otp', async () => {
            const otpDetails = {
                otp: 123457
            };

            const res = await request(process.env.BASE_URL)
                .put('/user/email/change')
                .set({ Authorization: clientPayload.token })
                .send(otpDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, falseDataStatus);
            assert.equal(res.statusCode, 400);
        });

        it('As a client user I can change my email address', async () => {
            const otpDetails = {
                otp: 123456
            };

            const res = await request(process.env.BASE_URL)
                .put('/user/email/change')
                .set({ Authorization: clientPayload.token })
                .send(otpDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
