const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyCertificateEdit');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Agency can edit certificate', () => {
    try {
        TestCase.certificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/certificates')
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

        it('As a agency I can edit without data certificates', async () => {
            const certificateDetails = {};
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificates')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit certificates', async () => {
            const certificateDetails = {
                certificates: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificates')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

