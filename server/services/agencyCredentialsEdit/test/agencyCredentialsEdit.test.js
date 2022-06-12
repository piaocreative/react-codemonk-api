const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyCredentialsEdit');
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
describe('Agency update certificate and credentials', () => {
    try {
        TestCase.credentials.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/credentials')
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

        it('As a agency I can edit credentials details', async () => {
            const certificateDetails = {
                certificateDetails: []
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials details', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of linkedIn url', async () => {
            const certificateDetails = {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of github url', async () => {
            const certificateDetails = {
                gitHubUrl: 'https://github.com/bill-gates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of dribble url', async () => {
            const certificateDetails = {
                dribbbleUrl: 'https://dribbble.com/KendrickKidd'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of clutch url', async () => {
            const certificateDetails = {
                clutchUrl: 'https://clutch.co/profile/hyperlink-infosystem'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of good firms url', async () => {
            const certificateDetails = {
                goodfirmsUrl: 'https://www.goodfirms.co/software/crest-erp'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit credentials of other Url', async () => {
            const certificateDetails = {
                otherWebsiteUrl: 'https://innovify.com/'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/credentials')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

