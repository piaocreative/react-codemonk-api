const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyPayDetails');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Agency User
const agencyBeforeOnboardUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const requestBeforeOnboardPayload = {
    token: jwt.sign(agencyBeforeOnboardUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Agency pay details', () => {
    try {
        TestCase.payDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/pay-details')
                    .set({ Authorization: requestBeforeOnboardPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency I can save agency pay details', async () => {
            const payDetails = {
                bankName: 'Kotak Bank',
                bankAccountNumber: 'ABC12345',
                bankCode: 'ABSS21222'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/pay-details')
                .send(payDetails)
                .set({ Authorization: requestBeforeOnboardPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save agency pay details from account settings', async () => {
            const payDetails = {
                bankName: 'Kotak Bank',
                bankAccountNumber: 'ABC12345',
                bankCode: 'ABSS21222'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/pay-details')
                .send(payDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

