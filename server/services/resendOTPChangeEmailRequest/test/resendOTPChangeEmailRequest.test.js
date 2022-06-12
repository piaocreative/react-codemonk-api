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

describe('User can resend opt for change email request', () => {
    try {
        it('As a client user I can resend email change otp', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/email/resend-otp')
                .set({ Authorization: agencyTalentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, falseDataStatus);
            assert.equal(res.statusCode, 400);
        });

        it('As a agency talent user I can\' resend email change otp', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/email/resend-otp')
                .set({ Authorization: clientPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
